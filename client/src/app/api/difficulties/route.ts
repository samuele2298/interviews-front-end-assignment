import { NextResponse } from 'next/server';
import { DifficultyType } from '@/src/types/api';
const db = require('@/public/db.json');

// GET Handler to fetch difficulties  
export async function GET() {
    try {
        const difficulties: DifficultyType[] = db.difficulties;
        return NextResponse.json(difficulties, { status: 200 });
    } catch (error) {
        console.error('Error fetching difficulties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

