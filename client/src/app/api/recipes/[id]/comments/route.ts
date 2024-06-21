import { NextRequest, NextResponse } from 'next/server';
import { CommentType } from '@/types/api';
import { CommentFormType } from '@/types/form';

import fs from 'fs';
import path from 'path';
import db from '../../../../../../public/db.json'; // Ensure the correct path to db.json

// Function to read from db.json
const readFromDB = () => {
    const rawData = fs.readFileSync('./public/db.json', 'utf-8');
    return JSON.parse(rawData);
};

// Function to write to db.json
const writeToDB = (data: CommentType[]) => {
    fs.writeFileSync(path.resolve('./public/db.json'), JSON.stringify(data, null, 2));
};

// Function to generate a new unique ID for comments as string
const generateNewCommentId = (comments: CommentType[]): string => {
    // Sort comments by ID in descending order to get the latest ID
    const sortedComments = comments.slice().sort((a, b) => Number(b.id) - Number(a.id));
    const lastComment = sortedComments[0]; // Get the comment with the highest ID

    const lastId = lastComment ? lastComment.id : '0'; // Default to '0' if no comments
    const newId = String(Number(lastId) + 1); // Convert the sum to string
    return newId;
};


// GET Handler to fetch comments for a specific recipe
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Destructure 'id' from params

        //const { searchParams } = new URL(req.url);
        //const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
        }

        const comments: CommentType[] = db.comments.filter(comment => comment.recipeId === id);
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST Handler to add a new comment to a specific recipe

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const { id } = params; // Destructure 'id' from params


        if (!id) {
            return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
        }


        // Read existing data from db.json
        const db = readFromDB();

        // Find the recipe by id to associate the comment with it (assuming recipes have unique ids)
        const recipe = db.recipes.find((recipe: { id: string }) => recipe.id === id);

        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        const newComment = await req.json(); // Assuming the request body contains the new comment data
        newComment.id = generateNewCommentId(db.comments); // Generate new comment id
        newComment.recipeId = id; // Associate the comment with the recipe ID

        // Add the new comment to the comments array
        db.comments.push(newComment);

        // Write updated data back to db.json
        writeToDB(db);



        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error adding comment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}