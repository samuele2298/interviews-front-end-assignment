import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../public/db.json'; // Assuming db.json is in the root or accessible



// GET Handler to fetch comments for a specific recipe
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return new Response(JSON.stringify({ error: 'Recipe ID is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const recipe = db.recipes.find(recipe => recipe.id == id);

        if (!recipe) {
            return new Response(JSON.stringify({ error: 'Recipe not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(recipe), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
