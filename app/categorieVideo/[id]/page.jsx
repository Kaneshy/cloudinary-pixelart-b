'use client'
import { FetchVideosbyTags } from '@/lib/actions/video.actions';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdPlay } from "react-icons/io";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaCheck } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import SavetoPage from '@/components/popup/saveto';
import { ImEmbed } from "react-icons/im";



const CategorieVideoPage = ({ params }) => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState(null)
    const [totalCountS, settotalCountS] = useState(null)
    const [selectedSize, setselectedSize] = useState([]);
    const [selecImgs, setselecImgs] = useState(false)

    useEffect(() => {

        async function FetchImages() {
            const result = await FetchVideosbyTags({ tag: params.id, nCursor: null, maxResults: 20 });
            setImages(result.props.propsB); // Store the result in the component state
            settotalCountS(result.props.totalCount)
            if (result.props.nextCursor) {
                setCursor(result.props.nextCursor)
            }
        }
        FetchImages()
    }, [])

    const fetchVideos = async () => {

        if (totalCountS === null) {
            return
        }

        let countOfTen = Math.floor(totalCountS / 20); // Calculate how many times 10 fits into the number
        let remainder = totalCountS % 20; // Calculate the remainder
        if (page < countOfTen) {
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
            const result = await FetchVideosbyTags({ tag: params.id, nCursor: cursor, maxResults: 20 + remainder });
            console.log(result)
            // const processedImages = result.props.publicId.slice(20);
            setImages((prevPosts) => [...prevPosts, ...result.props.propsB]);
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

    const handleCopyUrl = (url) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    console.log('cliped');
                })
                .catch((err) => {
                    console.error('Failed to copy URL:', err);
                });
        } else {
            alert('Clipboard API not supported');
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
                <div className='fixed bottom-[80px] z-20 max-lg:left-6  lg:bottom-2  lg:right-[13rem]  '>
                    <button
                        onClick={() => setselecImgs(!selecImgs)}
                        className={`  p-4 text-white flex gap-2  rounded-2xl ${selecImgs ? 'bg-blue-700 max-lg:bg-blue-700' : 'bg-zinc-950 max-lg:bg-black '}`}>
                        <CiShoppingTag size={24} />
                        <p className='lg:hidden'>Select</p>
                    </button>
                </div>
                <section className='hp-container p-4 select-none'>
                    {selectedSize && selectedSize.length > 0 && (
                        <div className='fixed z-50 bottom-4 left-8 bg-blue-700 rounded-xl font-bold text-white'>
                            <SavetoPage pId={selectedSize} />
                        </div>
                    )}
                    <div className='pm-grid-container' >
                        {images && images.map((pId, index) => (
                            <main key={index} className={selectedSize.includes(pId.public_id) ? 'border-blue-700 border bg-zinc-950 rounded-xl' : 'bg-zinc-950 rounded-xl'}>
                                <Link href={`/ByVideo/${pId.public_id}`} className='relative hover:blur-sm flex items-center justify-center img-content'   >
                                    <img loading='lazy' src={pId.secure_url} alt={`Imagen ${index}`} />
                                    <div className='absolute rounded-full blur-none p-2'>
                                        <IoMdPlay size={24} />
                                    </div>
                                </Link>
                                {selecImgs && (
                                    <div className='flex items-center  bg-zinc-900 rounded-b-xl px-2 gap-2'>
                                        <button
                                            onClick={() => handleselected(pId.public_id)}
                                            className={'text-blue-700 w-6 h-6 flex items-center justify-center  border border-zinc-700'}
                                        >

                                            {selectedSize.includes(pId.public_id) ? <FaCheck size={14} /> : <p></p>}
                                        </button>
                                        <div className='hover:text-blue-700'>
                                            <SavetoPage pId={pId.public_id} />
                                        </div>
                                        <button
                                            onClick={() => handleCopyUrl(pId.secure_b)}
                                            className={'text-white p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 border border-transparent transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-purple-500'}>
                                            <ImEmbed size={16} />
                                        </button>

                                    </div>
                                )}
                            </main>
                        ))}
                    </div>
                </section>

            </div >
        </InfiniteScroll >
    );
};

export default CategorieVideoPage;