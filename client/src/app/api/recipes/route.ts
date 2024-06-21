import { NextRequest, NextResponse } from 'next/server';

import { RecipeType } from '../../../types/api';
import db from '../../../../public/db.json'; // Assuming db.json is in the root or accessible
import fs from 'fs';
import path from 'path';

// Function to read from db.json
const readFromDB = () => {
    const rawData = fs.readFileSync('./public/db.json', 'utf-8');
    return JSON.parse(rawData);
};

// Function to write to db.json
const writeToDB = (data: RecipeType[]) => {
    fs.writeFileSync(path.resolve('./public/db.json'), JSON.stringify(data, null, 2));
};

// Function to generate a new unique ID for comments as string
const generateNewRecipeId = (recipes: RecipeType[]): string => {
    // Sort comments by ID in descending order to get the latest ID
    const sortedRecipes = recipes.slice().sort((a, b) => Number(b.id) - Number(a.id));
    const lastRecipe = sortedRecipes[0]; // Get the comment with the highest ID

    const lastId = lastRecipe ? lastRecipe.id : '0'; // Default to '0' if no comments
    const newId = String(Number(lastId) + 1); // Convert the sum to string
    return newId;
};

export async function GET(req: NextRequest) {
    try {

        // Extract query parameters from the request URL
        const searchParams = new URL(req.nextUrl).searchParams;

        // Extract individual query parameters
        const _page = searchParams.get('_page');
        const _limit = searchParams.get('_limit');
        const q = searchParams.get('q');
        const cuisineId = searchParams.get('cuisineId');
        const dietId = searchParams.get('dietId');
        const difficultyId = searchParams.get('difficultyId');
        const _expand = searchParams.getAll('_expand');

        console.log('_page:', _page);
        console.log('_limit:', _limit);
        console.log('q:', q);
        console.log('cuisineId:', cuisineId);
        console.log('dietId:', dietId);
        console.log('difficultyId:', difficultyId);
        console.log('_expand:', _expand);

        // Convert _page and _limit to numbers, with defaults if not provided
        const page = _page ? parseInt(_page as string, 10) : 1;
        const limit = _limit ? parseInt(_limit as string, 10) : 10;

        // Filter recipes based on query parameters
        var filteredRecipes: RecipeType[] = [...db.recipes]; // Copy recipes array from db.json

        if (q) {
            // Perform full text search filtering (assuming 'q' filters by recipe name or similar)
            const query = q.toString().toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(query)
            );
        }

        if (cuisineId) {
            // Filter recipes by cuisineId
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.cuisineId === cuisineId.toString()
            );
        }

        if (dietId) {
            // Filter recipes by dietId
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.dietId === dietId.toString()
            );
        }

        if (difficultyId) {
            // Filter recipes by difficultyId
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.difficultyId === difficultyId.toString()
            );
        }

        // Perform expansion if requested
        if (_expand && Array.isArray(_expand)) {
            if (_expand.includes('difficulty')) {
                // Add difficulty object to each recipe (assuming difficulty is a nested object in db.json)
                filteredRecipes.forEach(recipe => {
                    // Assuming db.difficulties is an array of difficulty objects
                    recipe.difficulty = db.difficulties.find(d => d.id === recipe.difficultyId);
                });
            }
            if (_expand.includes('cuisine')) {
                // Add cuisine object to each recipe (assuming cuisine is a nested object in db.json)
                filteredRecipes.forEach(recipe => {
                    // Assuming db.cuisines is an array of cuisine objects
                    recipe.cuisine = db.cuisines.find(c => c.id === recipe.cuisineId);
                });
            }
            if (_expand.includes('diet')) {
                // Add diet object to each recipe (assuming diet is a nested object in db.json)
                filteredRecipes.forEach(recipe => {
                    // Assuming db.diets is an array of diet objects
                    recipe.diet = db.diets.find(d => d.id === recipe.dietId);
                });
            }
        }

        // Paginate the filtered recipes
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

        return NextResponse.json(paginatedRecipes, { status: 200 });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



// POST Handler
export async function POST(req: NextRequest) {
    try {
        //console.log('Received JSON:', req.json());

        // Read existing data from db.json
        const db = readFromDB();

        const newRecipe = await req.json(); // Assuming the request body contains the new comment data
        newRecipe.id = generateNewRecipeId(db.recipes); // Generate new comment id

        // Add the new comment to the comments array
        db.recipes.push(newRecipe);

        // Write updated data back to db.json
        writeToDB(db);


        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        console.error('Error adding recipe:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}