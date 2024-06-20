import { NextRequest, NextResponse } from 'next/server';
import { CommentType } from '../../../../../types/api';
import fs from 'fs';
import path from 'path';
import db from '../../../../../../public/db.json'; // Ensure the correct path to db.json

// Function to write to db.json
const writeToDB = (data: CommentType[]) => {
    fs.writeFileSync(path.resolve('./public/db.json'), JSON.stringify(data, null, 2));
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
export async function POST(req: NextRequest) {


    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
        }

        const newComment: CommentType = await req.json();
        newComment.recipeId = id; // Associate the comment with the recipe ID
        const comments: CommentType[] = db.comments;

        // Add the new comment
        comments.push(newComment);

        // Write to the db.json file
        writeToDB(comments);

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error adding comment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}