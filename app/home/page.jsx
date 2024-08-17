'use server'
import { UploadImage } from '@/lib/actions/upload.actions';
import React from 'react';

const UploadPage = async () => {
    let userInfo;

    try {
        userInfo = await UploadImage();
        console.log(userInfo);
    } catch (error) {
        console.error("Error uploading image:", error);
    }

    return (
        <div className='p-4 bg-blue-400'>
            {userInfo ? (
                <div>{/* Render userInfo content here */}</div>
            ) : (
                <div>Loading...</div> // Or an error message if needed
            )}
        </div>
    );
};

export default UploadPage;