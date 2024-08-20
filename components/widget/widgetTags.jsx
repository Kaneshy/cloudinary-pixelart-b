'use client'
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import UploadWidgetCdl from './UploadWidget';

const WidgetTags = ({tagsArray, folderName}) => {
    const [resource, setResource] = useState();

    useEffect(() => {
        console.log('wT', tagsArray, folderName);
    }, []);


    return (
        <div className='flex items-center justify-center'> 
            <CldUploadWidget
                options={{
                    tags: tagsArray, // Use the tagsArray state
                    folder: folderName
                }}
                uploadPreset="books_preset"
                onSuccess={(result, { widget }) => {
                    setResource(result?.info);  // { public_id, secure_url, etc }
                }}
            >
                {({ open }) => {
                    return (
                        <button 
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={() => {
                            open();
                        }}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default WidgetTags;

