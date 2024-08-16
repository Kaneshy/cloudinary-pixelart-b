'use client'
import { FetchImagesbyTags } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';

const CategoriePage = ({params}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function FetchImages() {
            const result = await FetchImagesbyTags(params.id);
            setImages(result.props.publicId); // Store the result in the component state
        }
        FetchImages()
    }, [params])

    return (
        <div>
            {/* <form action={create}>
                <button type="submit">upload</button>
            </form> */}

            <section className='hp-container mt-36'>
                <div className='pm-grid-container'>
                    {images && images.map((pId, index) => (
                        <div key={index} className='img-content'>
                            <CldImage
                                width="250"
                                height="300"
                                src={pId}
                                alt={`Image ${index}`}
                                priority={false}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategoriePage;