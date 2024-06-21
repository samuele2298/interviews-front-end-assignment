
import { NextResponse } from 'next/server';
import { CuisineType } from '@/src/types/api';
const db = require('@/public/db.json');


// GET Handler to fetch cuisines  

export async function GET() {
    try {
        const cuisines: CuisineType[] = db.cuisines;
        return NextResponse.json(cuisines, { status: 200 });
    } catch (error) {
        console.error('Error fetching cuisine:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

