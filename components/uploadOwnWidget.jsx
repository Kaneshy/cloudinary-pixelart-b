'use client';

import { createMessage } from '@/lib/actions/upload.actions';
import React, { useState } from 'react';

const UploadOwnWidget = ({ isopen, setisopen }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const closeWidget = () => {
        setisopen(!isopen);
    }

    return (
        <form action={createMessage} method="post" encType="multipart/form-data" className="text-white centered-div  flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
            <label className="text-slate-200 font-medium border-b border-slate-400 p-2 text-center"> Add New Post </label>
            <button className='fixed top-2 right-2 p-2 ' onClick={closeWidget}>X</button>

            <label  htmlFor="image"  className="text-slate-200 font-medium">
                Upload Image:
            </label>
            <label htmlFor="image" className="text-center mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Select from computer
            </label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="input-file"
            />

            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Selected Image Preview" className="w-full h-auto rounded-md shadow-sm" />
                </div>
            )}

            <label htmlFor="text" className="text-slate-200 font-medium">
                tags:
            </label>
            <textarea
                placeholder='anime,music,cover'
                id="text"
                name="text"
                className="border-2 min-h-8 border-slate-300 rounded-md p-2 text-black focus:ring-2 focus:ring-blue-400"
            />


            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                disabled={!preview}
            >
                Create
            </button>
        </form>

    );
};

export default UploadOwnWidget;