import { RecipeType } from '@/src/types/api';
import { NextRequest } from 'next/server';

const db = require('@/public/db.json');


// GET Handler to fetch specific recipe 
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id || id === undefined || id == "") {
            return new Response(JSON.stringify({ error: 'Recipe ID is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        const recipe = db.recipes.find((recipe: RecipeType) => recipe.id == id);

        if (!recipe) {
            return new Response(JSON.stringify({ error: 'Recipe not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(recipe), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}


