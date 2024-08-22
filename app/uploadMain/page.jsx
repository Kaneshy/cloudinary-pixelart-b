'use client'
import axios from 'axios';
import { useState } from 'react';

export default function HomePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData)


        // try {
        //     const imageUpload = await uploadImage({
        //         formData
        //     });
        //     console.log(imageUpload);
        // } catch (error) {
        //     console.error("Error uploading image:", error);
        // }

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            setUploadedUrl(response.data.url);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='hp-container mt-36'>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading || !selectedFile}>
                    {loading ? "Uploading..." : "Upload Image"}
                </button>
            </div>

            {uploadedUrl && (
                <div>
                    <p>Image uploaded successfully!</p>
                    <img src={uploadedUrl} alt="Uploaded" />
                </div>
            )}
        </section>
    );
}