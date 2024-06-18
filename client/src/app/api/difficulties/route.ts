import { NextResponse } from 'next/server';
import { DifficultyType } from '../../../types/api';
import db from '../../../../public/db.json'; // Assuming db.json is in the root or accessible

export async function GET() {
    try {
        const difficulties: DifficultyType[] = db.difficulties;
        return NextResponse.json(difficulties, { status: 200 });
    } catch (error) {
        console.error('Error fetching difficulties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

