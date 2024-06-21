
import { NextResponse } from 'next/server';
import { DietType } from '@/src/types/api';
const db = require('@/public/db.json');


// GET Handler to fetch diets  
export async function GET() {
    try {
        const diets: DietType[] = db.diets;
        return NextResponse.json(diets, { status: 200 });
    } catch (error) {
        console.error('Error fetching diets:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

