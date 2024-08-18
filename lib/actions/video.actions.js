'use server'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'

export const uploadVideo = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const text = formData.get('text');
    const video = formData.get('video'); // Expecting a video instead of an image
    const tagsA = text.split(',').map(tag => tag.trim());

    console.log('text', text)
    let uploadedVideoUrl = null;

    if (video) {
        // Convert video to base64 or stream format
        const videoUploadResponse = await uploadVideoToCloudinary(video, tagsA);
        uploadedVideoUrl = videoUploadResponse.secure_url;
        console.log('Uploaded Video URL:', videoUploadResponse);
    }
};


const uploadVideoToCloudinary = async (videoFile, tagsA) => {
    console.log('runinng server')
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
    });

    try {
        // Convert the file to a buffer
        const buffer = await videoFile.arrayBuffer();
        const base64Video = Buffer.from(buffer).toString('base64');
        const videoDataUri = `data:${videoFile.type};base64,${base64Video}`;

        const resultUnsigned = await cloudinary.v2.uploader.unsigned_upload(videoDataUri, "books_preset", {
            folder: "videos", // Optional: specify a folder in Cloudinary
            tags: tagsA,
            resource_type: "video", // Specify the resource type as video
            asset_folder: "books", // Optional: specify a folder in Cloudinary
        });

        console.log('resultUnsigned', resultUnsigned)

        return resultUnsigned;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};


export const FetchVideosbyTags = async ({ tag, nCursor, maxResults }) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.API_SECRET,
    });

    try {
        // Construct the base expression
        let expression = `resource_type:video AND folder=videos`;
        // Conditionally add the tag filter
        // if (tag !== 'All') {
        //     expression += ` AND tags=${tag}`;
        // }
        // console.log(expression)

        // Execute the search query
        const results = await cloudinary.v2.search
            .expression(expression)
            .sort_by('uploaded_at', 'desc')
            .max_results(maxResults)
            .next_cursor(nCursor)
            .execute();
        const publicIdAndUrls = results.resources.map(resource => {
            // Replace `.mp4` with `.jpg` in the secure_url
            const modifiedUrl = resource.secure_url.replace('.mp4', '.jpg');

            // Return an object with both secure_url and public_id
            return {
                secure_url: modifiedUrl,
                public_id: resource.public_id
            };
        });
        console.log('data', nCursor, maxResults )
        const nextCursor = results.next_cursor
        const totalCount = results.total_count
        console.log('nextCursor', nextCursor, totalCount)
        console.log('publicIdAndUrls', publicIdAndUrls, totalCount)
        return {
            props: {
                propsB: publicIdAndUrls, // Pasar secureUrls como propiedad al componente homePage
                nextCursor: nextCursor,
                totalCount: totalCount
            }
        }

    } catch (error) {
        console.error('Error al obtener los resultados de Cloudinary:', error);
        throw error;
    }

}

export const FetchSingleVideo = async ({ tag }) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.API_SECRET,
    });

    try {
        // Construct the base expression
        let expression = `resource_type:video AND folder=videos AND public_id=${tag}`;
        // Conditionally add the tag filter
        // if (tag !== 'All') {
        //     expression += ` AND tags=${tag}`;
        // }
        // console.log(expression)

        // Execute the search query
        const results = await cloudinary.v2.search
            .expression(expression)
            .sort_by('uploaded_at', 'desc')
            .max_results(1)
            .execute();
        const publicIdAndUrls = results.resources.map(resource => resource.secure_url);
        return {
            props: {
                publicIdAndUrls // Pasar secureUrls como propiedad al componente homePage
            }
        }

    } catch (error) {
        console.error('Error al obtener los resultados de Cloudinary:', error);
        throw error;
    }

}


export const DeleteVideobyPublicId = async ({ publicIdA }) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.API_SECRET,
    });

    const deleteimg = await cloudinary.uploader.destroy(publicIdA, {
        resource_type: 'video',
    }, function (result) { console.log(result) });
    console.log(deleteimg)

    return deleteimg
}


