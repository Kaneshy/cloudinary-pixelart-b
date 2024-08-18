'use client'
import { FetchVideosbyTags } from '@/lib/actions/video.actions';
import { CldImage } from 'next-cloudinary';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdPlay } from "react-icons/io";
import InfiniteScroll from 'react-infinite-scroll-component';


const CategorieVideoPage = ({ params }) => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState(null)
    const [totalCountS, settotalCountS] = useState(null)

    useEffect(() => {
        async function FetchImages() {
            const result = await FetchVideosbyTags({ tag: params.id, nCursor: null, maxResults: 20});
            setImages(result.props.propsB); // Store the result in the component state
            console.log(result)
            console.log(result.props.propsB)
            settotalCountS(result.props.totalCount)
            if (result.props.nextCursor) {
                setCursor(result.props.nextCursor)
            }
        }
        FetchImages()
    }, [])

    const fetchVideos = async () => {
        console.log('running fetchVideos')
        let countOfTen = Math.floor(totalCountS / 20); // Calculate how many times 10 fits into the number
        let remainder = totalCountS % 20; // Calculate the remainder

        if (page < countOfTen) {
            console.log('if')
            try {
                const result = await FetchVideosbyTags({ tag: params.id, nCursor: cursor, maxResults: 20 });
                setImages((prevPosts) => [...prevPosts, ...result.props.propsB]);
                if (result.props.nextCursor) {
                    setCursor(result.props.nextCursor)
                }
                setPage((prevPage) => prevPage + 1);


            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        } else if (page == countOfTen) {
            console.log('else if')
            const result = await FetchVideosbyTags({ tag: params.id, nCursor: cursor, maxResults: 20 + remainder });
            // const processedImages = result.props.publicId.slice(20);
            setImages((prevPosts) => [...prevPosts, ...result.props.propsB]);
            setPage((prevPage) => prevPage + 1);
        } else {
            console.log('else')
            setHasMore(false)
        }


    };



    return (
        <InfiniteScroll
            dataLength={images.length}
            next={fetchVideos}
            hasMore={hasMore}
            loader={
                <div className='w-full flex justify-center items-center text-center p-8'>
                    <div className='bg-zinc-700 px-8 py-4 rounded-xl font-bold text-sm'>Loading...</div>
                </div>
            }
        >
            <div>
                <section className='hp-container p-4 select-none'>
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
        </InfiniteScroll>
    );
};

export default CategorieVideoPage;