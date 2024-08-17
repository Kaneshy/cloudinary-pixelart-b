'use client'
import { FetchVideosbyTags } from '@/lib/actions/video.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdPlay } from "react-icons/io";


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

            <section className='hp-container mt-36 select-none'>
                <div className='pm-grid-container' >
                    {images && images.map((pId, index) => (
                        <Link href={`/ByImagen/${pId.public_id}`} key={index} className='relative hover:blur-sm flex items-center justify-center img-content'   >
                            <img loading='lazy' src={pId.secure_url} alt={`Imagen ${index}`} />
                            <div className='absolute rounded-full blur-none p-2'>
                                <IoMdPlay size={24} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategorieVideoPage;