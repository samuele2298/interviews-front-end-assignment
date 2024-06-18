import { NextRequest, NextResponse } from 'next/server';
import { RecipeType } from '../../../../types/api';
import db from '../../../../../public/db.json'; // Assuming db.json is in the root or accessible



// GET Handler to fetch comments for a specific recipe
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
        }

        const recipes: RecipeType[] = db.recipes.filter(recipe => recipe.id === id);
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
