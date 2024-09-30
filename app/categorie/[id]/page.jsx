'use client'
import { AddTagsAction, DeleteImagebyPublicId, FetchImagesbyTags } from '@/lib/actions/upload.actions';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import SavetoPage from '@/components/popup/saveto';
import AddTagsPage from '@/components/popup/addTags';
import { FaCheck } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import { ImEmbed } from 'react-icons/im';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";





const CategoriePage = ({ params }) => {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextImg, setnextImg] = useState('')
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState(null)
    const [totalCountS, settotalCountS] = useState(null)
    const [selectedSize, setselectedSize] = useState([]);
    const [selecImgs, setselecImgs] = useState(false)
    const [popupImg, setpopupImg] = useState(false)
    const [imgPopUp, setimgPopUp] = useState('')
    const [revalidateH, setrevalidateH] = useState(true)
    const [currentImg, setcurrentImg] = useState(0)

    const popupRef = useRef();




    useEffect(() => {
        console.log('selectedSize', selectedSize)
        async function FetchImages() {
            const result = await FetchImagesbyTags({ tag: params.id, nCursor: null, maxResults: 20, });
            setImages(result.props.publicIdAndUrls); // Store the result in the component state
            settotalCountS(result.props.totalCount)
            if (result.props.nextCursor) {
                setCursor(result.props.nextCursor)
            }
        }
        FetchImages()
    }, [revalidateH])


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
                setImages((prevPosts) => [...prevPosts, ...result.props.publicIdAndUrls]);
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
            setImages((prevPosts) => [...prevPosts, ...result.props.publicIdAndUrls]);
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
    }

    const handleSeveralTags = async () => {
        console.log(selectedSize)
        const res = await AddTagsAction({ selectedSize, pId })
        console.log(res)
    };


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

    const handlePopUpImg = (url, index) => {
        setimgPopUp(url)
        setpopupImg(!popupImg)
        setcurrentImg(index)
    }

    const handleOverlayClick = (e) => {
        // Close the popup if the click is outside the image
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setpopupImg(!popupImg)
        }
    };

    const deleteImage = async (url) => {
        const res = await DeleteImagebyPublicId({ publicIdA: url })
        if (res.result == 'ok') {
            setrevalidateH(!revalidateH)
            console.log('imagen deleted')
        } else {
            console.log('Error at deleting request')
        }
        console.log(res.result)
    }

    const handleSelectedImages = () => {
        setselecImgs(!selecImgs)
        setselectedSize([])
    }




    const handleCurrectImg = (fun) => {
        if (images.length > 0) {
            if (fun == 'back') {
                if (currentImg === 0) {
                    return
                } else {
                    setcurrentImg(currentImg - 1)
                }

            } else if (fun == 'forward') {
                if (currentImg === images.length - 1) {
                    setcurrentImg(currentImg )
                } else {
                    setcurrentImg(currentImg + 1)
                    return
                }
            } else {
                console.log('error popup')
            }
        }


    }

    useEffect(() => {
        console.log(images.length, currentImg);
    
        if (images.length === 0) return; // Exit if there are no images
    
        if (currentImg >= images.length - 4) {
            fetchVideos(); // Fetch videos when we reach the last image
        }
    
        if (currentImg < images.length) {
            setimgPopUp(images[currentImg].secure_url); // Set image for valid currentImg
        }

       

    }, [currentImg, images]);


    return (
        <InfiniteScroll
            dataLength={images.length}
            next={fetchVideos}
            hasMore={hasMore}
            loader={
                <div className='w-full flex justify-center items-center text-center p-8'>
                    <div className='bg-zinc-900 px-8 py-4 rounded-xl font-bold pixelify-sans text-sm'> LOADING... </div>
                </div>
            }
        >
            <div>
                <div className='fixed   bottom-[90px] max-lg:left-6  lg:bottom-2  lg:right-[13rem]  '>
                    <button
                        onClick={handleSelectedImages}
                        className={`  p-4 text-white flex gap-2  rounded-2xl ${selecImgs ? 'bg-blue-700 max-lg:bg-blue-700' : 'bg-[#070707] '}`}>
                        <CiShoppingTag size={24} />
                    </button>
                </div>
                {popupImg && (
                    <section className='flex fixed inset-0 z-50 h-screen w-full '>
                        <button
                            ref={popupRef}
                            onClick={() => handleCurrectImg('back')}
                            className="absolute h-40 p-4 w-10 left-0 top-1/2 transform z-50 -translate-y-1/2  hover:text-white text-black  py-2 px-4 rounded">
                            <IoIosArrowBack size={24} />

                        </button>
                        <div onClick={handleOverlayClick} className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-95">
                            <button
                                onClick={() => setpopupImg(!popupImg)}
                                className="absolute max-sm:right-1/2 max-sm:bottom-6 bg-opacity-30  z-50 sm:top-2 right-2 text-white bg-white  p-2 rounded-full"
                            >
                                <IoMdClose />
                            </button>
                            <div ref={popupRef} className="relative z-40">
                                <img src={imgPopUp} alt="Popup" className="max-w-full z-30  p-2 h-screen object-contain" />

                            </div>
                        </div>
                        <button
                            ref={popupRef}
                            onClick={() => handleCurrectImg('forward')}
                            className="absolute h-40 p-4 right-0 top-1/2 transform z-50 -translate-y-1/2  hover:text-white text-black   py-2 px-4 rounded">
                            <IoIosArrowForward size={24} />

                        </button>
                    </section>

                )}
                <section className='hp-container p-4 max-sm:p-0'>
                    {selectedSize && selectedSize.length > 0 && (
                        <div className='fixed top-38 z-20 py-2 px-4 flex gap-2 rounded-lg items-center justify-evenly left-8 bg-blue-700 font-bold text-white'>
                            <SavetoPage pId={selectedSize} />
                            <p>{selectedSize.length}</p>
                        </div>
                    )}
                    <div className='pm-grid-container' >
                        {images && images.map((pId, index) => (
                            <main key={index} className={selectedSize.includes(pId.public_id) ? 'border-blue-700 border bg-zinc-950 rounded-xl' : 'bg-zinc-950 rounded-xl '}>
                                {/* <Link href={`/ByImagen/${pId.public_id}`} target='_blank' className='flex-col img-content'   > */}
                                {/* <img loading='lazy' src={url} alt={`Imagen ${index}`} /> */}
                                {/* <CldImage
                                        className='max-sm:w-full'
                                        width="250"
                                        height="300"
                                        sizes="100vw"
                                        src={pId.public_id}
                                        alt="Description of my image"
                                        priority={false}
                                    />
                                </Link> */}
                                <div onClick={() => handlePopUpImg(pId.secure_url, index)} className='flex-col img-content'   >
                                    {/* <img loading='lazy' src={url} alt={`Imagen ${index}`} /> */}
                                    <CldImage
                                        className='max-sm:w-full'
                                        width="250"
                                        height="300"
                                        sizes="100vw"
                                        src={pId.public_id}
                                        alt="Description of my image"
                                        priority={false}
                                    />
                                </div>

                                {selecImgs && (
                                    <div className='flex items-center p-2 bg-zinc-900 rounded-b-xl px-2 gap-2'>
                                        <button
                                            onClick={() => handleselected(pId.public_id)}
                                            className={'text-blue-700 w-6 h-6 flex items-center justify-center  border border-zinc-700'}
                                        >

                                            {selectedSize.includes(pId.public_id) ? <FaCheck size={20} /> : <p></p>}
                                        </button>
                                        <div className=''>
                                            <SavetoPage pId={pId} />
                                        </div>
                                        <button
                                            onClick={() => handleCopyUrl(pId.secure_url)}
                                            className={'text-white p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 border border-transparent transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-purple-500'}>
                                            <ImEmbed size={16} />
                                        </button>
                                        <button className='p-2 rounded-full bg-zinc-800 hover:bg-red-700' onClick={() => deleteImage(pId.public_id)}>
                                            <MdDelete />
                                        </button>

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