'use client'
import { FetchImagesbyTags } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';


const CategoriePage = ({ params }) => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState(null)
    const [totalCountS, settotalCountS] = useState(null)

    useEffect(() => {
        console.log('rjds', params.id)
        async function FetchImages() {
            const result = await FetchImagesbyTags({ tag: params.id, nCursor: null, maxResults: 20, });
            setImages(result.props.publicId); // Store the result in the component state
            console.log('tcound', result.props.totalCount)
            settotalCountS(result.props.totalCount)
            if (result.props.nextCursor) {
                setCursor(result.props.nextCursor)
            }
        }
        FetchImages()
    }, [])

    const fetchVideos = async () => {
        console.log('fetchvideos')
        console.log(page, totalCountS)

        if (totalCountS === null) {
            return
        }

        let countOfTen = Math.floor(totalCountS / 20); // Calculate how many times 10 fits into the number
        let remainder = totalCountS % 20; // Calculate the remainder

        if (page < countOfTen) {
            console.log('if')
            try {
                const result = await FetchImagesbyTags({ tag: params.id, nCursor: cursor, maxResults: 20 });
                setImages((prevPosts) => [...prevPosts, ...result.props.publicId]);
                if (result.props.nextCursor) {
                    setCursor(result.props.nextCursor)
                }
                setPage((prevPage) => prevPage + 1);


            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        } else if (page == countOfTen) {
            console.log('else if')
            const result = await FetchImagesbyTags({ tag: params.id, nCursor: cursor, maxResults: 20 + remainder });
            // const processedImages = result.props.publicId.slice(20);
            setImages((prevPosts) => [...prevPosts, ...result.props.publicId]);
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
        </InfiniteScroll>
    );
};

export default CategoriePage;