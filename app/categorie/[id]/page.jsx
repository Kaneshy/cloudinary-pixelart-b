'use client'
import { FetchImagesbyTags } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoriePage = ({ params }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function FetchImages() {
            const result = await FetchImagesbyTags({tag: params.id});
            setImages(result.props.publicId); // Store the result in the component state
        }
        FetchImages()
    }, [params])

    return (
        <div>
            {/* <form action={create}>
                <button type="submit">upload</button>
            </form> */}

            <section className='hp-container p-4'>
                <div className='pm-grid-container' >
                    {images && images.map((pId, index) => (
                        <Link href={`/ByImagen/${pId}`} key={index} className=' img-content'   >
                            {/* <img loading='lazy' src={url} alt={`Imagen ${index}`} /> */}
                            <CldImage
                                width="250"
                                height="300"
                                crop="fill"
                                sizes="100vw"
                                src={pId}
                                alt="Description of my image"
                                priority={false}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategoriePage;