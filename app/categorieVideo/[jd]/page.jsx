'use client'
import { FetchVideosbyTags } from '@/lib/actions/video.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CategorieVideoPage = ({ params }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function FetchImages() {
            const result = await FetchVideosbyTags({ tag: params.id });
            setImages(result.props.publicIdAndUrls); // Store the result in the component state
            console.log(result)
        }
        FetchImages()
    }, [params])

    return (
        <div>
            {/* <form action={create}>
                <button type="submit">upload</button>
            </form> */}

            <section className='hp-container mt-36'>
                <div className='pm-grid-container' >
                    {images && images.map((pId, index) => (
                        <Link href={`/ByImagen/${pId.public_id}`} key={index} className='img-content'   >
                            <img loading='lazy' src={pId.secure_url} alt={`Imagen ${index}`} />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategorieVideoPage;