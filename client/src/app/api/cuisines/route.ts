
import { NextResponse } from 'next/server';
import { CuisineType } from '../../../types/api';
import db from '../../../../public/db.json'; // Assuming db.json is in the root or accessible

export async function GET() {
    try {
        const cuisines: CuisineType[] = db.cuisines;
        return NextResponse.json(cuisines, { status: 200 });
    } catch (error) {
        console.error('Error fetching cuisine:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

