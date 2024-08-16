import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {

    // const data = await request.json();
    // console.log(data)

    
    try {
        const file = request.body;
        const uploadResponse = await cloudinary.uploader.upload(file, {
            folder: 'books', // Optional: specify a folder in Cloudinary
        });

        return NextResponse.json(uploadResponse);
    } catch (error) {
        return NextResponse.json('failed');;
    }
}