import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';



export async function POST(req) {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const body = await req.json();

        const {paramsToSign} = body;

        const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

        return NextResponse.json({
            signature,
            api_key: process.env.CLOUDINARY_API_KEY,
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}