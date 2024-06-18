import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


// Function to handle serving uploaded images
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const imageName = searchParams.get('imageName');
        if (!imageName) {
            return NextResponse.json({ error: 'ImageName is required' }, { status: 400 });
        }
        const filePath = path.join(process.cwd(), 'public/uploads', imageName);

        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath);
            const contentType = 'image/jpeg'; // Adjust content type based on your image format

            // Send the file contents with appropriate headers
            return new NextResponse(fileContents, {
                headers: {
                    'Content-Type': contentType,
                },
                status: 200,
            });
        } else {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}