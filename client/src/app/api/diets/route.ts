
import { NextResponse } from 'next/server';
import { DietType } from '../../../types/api';
import db from '../../../../public/db.json'; // Assuming db.json is in the root or accessible

export async function GET() {
    try {
        const diets: DietType[] = db.diets;
        return NextResponse.json(diets, { status: 200 });
    } catch (error) {
        console.error('Error fetching diets:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

