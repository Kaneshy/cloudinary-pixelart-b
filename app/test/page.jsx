'use client';

import UploadWidgetCdl from '@/components/widget/UploadWidget';
import { createMessage } from '@/lib/actions/upload.actions';
import React, { useState } from 'react';

const TestPage = () => {
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

    return (
        <main>

        <UploadWidgetCdl/>


        <form action={createMessage} method="post" encType="multipart/form-data" className="flex flex-col gap-y-4 p-6 bg-slate-100 rounded-md shadow-lg">
            <label htmlFor="text" className="text-slate-700 font-medium">
                tags:
            </label>
            <textarea
                id="text"
                name="text"
                className="border-2 border-slate-300 rounded-md p-2 text-black focus:ring-2 focus:ring-blue-400"
            />

            <label htmlFor="image" className="text-slate-700 font-medium">
                Upload Image
            </label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="border-2 border-slate-300 rounded-md p-2 text-black focus:ring-2 focus:ring-blue-400"
            />

            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Selected Image Preview" className="w-full h-auto rounded-md shadow-sm" />
                </div>
            )}

            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                Create
            </button>
        </form>

        </main>

    );
};

export default TestPage;