'use client'
import { AddTagsAction, FetchImagesbyTags } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import SavetoPage from '@/components/popup/saveto';
import AddTagsPage from '@/components/popup/addTags';
import { FaCheck } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";


const CategoriePage = ({ params }) => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState(null)
    const [totalCountS, settotalCountS] = useState(null)
    const [selectedSize, setselectedSize] = useState([]);
    const [selecImgs, setselecImgs] = useState(false)

    useEffect(() => {
        console.log('selectedSize', selectedSize)
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

    const handleselected = (clothing) => {
        if (selectedSize.includes(clothing)) {
            // Si la prenda ya está seleccionada, la quitamos de la selección
            setselectedSize(selectedSize.filter(item => item !== clothing));
        } else {
            // Si la prenda no está seleccionada, la añadimos a la selección
            setselectedSize([...selectedSize, clothing]);
        }
        console.log(selectedSize)
    }

    const handleSeveralTags = async () => {
        console.log(selectedSize)
        const res = await AddTagsAction({ selectedSize, pId })
        console.log(res)
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
                <div className='py-2 select-none px-8 w-full bg-zinc-950'>
                    <button
                        onClick={() => setselecImgs(!selecImgs)}
                        className={` flex gap-2 items-center py-2 px-4 rounded-xl justify-center ${selecImgs ? 'bg-blue-700' : 'bg-zinc-900 '}`}>
                        <CiShoppingTag size={24} />
                        <p>Select</p>
                    </button>
                </div>
                <section className='hp-container p-4'>
                    {selectedSize && selectedSize.length > 0 && (
                        <div className='fixed bottom-4 left-8 bg-blue-700 rounded-xl font-bold text-white'>
                            <SavetoPage pId={selectedSize} />
                        </div>
                    )}
                    <div className='pm-grid-container' >
                        {images && images.map((pId, index) => (
                            <main className={selectedSize.includes(pId) ? 'border-blue-700 border bg-zinc-950 rounded-xl' : 'bg-zinc-950 rounded-xl'}>
                                <Link href={`/ByImagen/${pId}`}  key={index} className='flex-col img-content'   >
                                    {/* <img loading='lazy' src={url} alt={`Imagen ${index}`} /> */}
                                    <CldImage
                                        width="250"
                                        height="300"
                                        sizes="100vw"
                                        src={pId}
                                        alt="Description of my image"
                                        priority={false}
                                    />
                                </Link>
                                {selecImgs && (
                                    <div className='flex items-center bg-zinc-900 rounded-b-xl px-2 gap-2'>
                                        <button
                                            onClick={() => handleselected(pId)}
                                            className={'text-blue-700 w-6 h-6 flex items-center justify-center  border border-zinc-700'}
                                        >

                                            {selectedSize.includes(pId) ? <FaCheck size={14} /> : <p></p>}
                                        </button>
                                        <div className=''>
                                            <SavetoPage pId={pId} />
                                        </div>

                                    </div>
                                )}

                            </main>

                        ))}
                    </div>
                </section>
            </div>
        </InfiniteScroll>
    );
};

export default CategoriePage;