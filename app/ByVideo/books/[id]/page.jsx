'use client'
import { redirect, useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { DeleteVideobyPublicId, FetchSingleVideo } from '@/lib/actions/video.actions';
import { MdDelete } from "react-icons/md";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';




const ImgTarjet = ({ params }) => {
    const router = useRouter()

    const [images, setImages] = useState([]);

    useEffect(() => {
        async function FetchVideo() {
            const result = await FetchSingleVideo({ tag: `books/${params.id}` });
            console.log(result.props.publicIdAndUrls)
            setImages(result.props.publicIdAndUrls); // Store the result in the component state
        }
        FetchVideo()
    }, [])

    const deleteImage = async () => {
        const res = await DeleteVideobyPublicId({ publicIdA: `books/${params.id}` })
        if (res.result == 'ok') {
            router.push('/categorieVideo/All')
        } else {
            console.log('Error at deleting request')
        }
        console.log(res.result)
    }

    return (
        <>

            <main>
                <div className='header-max-h'>
                    {images && (
                        <div className="video-container">
                            <video width="1920" height="1080"
                                src={images} autoPlay allow="fullscreen" controls allowFullScreen>
                            </video>
                            {/* <iframe width="1920" height="1080"
                                //currentVideo.videoUrl
                                src={images} allow="autoplay; fullscreen" controls allowFullScreen>
                            </iframe> */}
                        </div>
                    )}
                </div>
                <section className='p-4 flex justify-start items-start text-start'>
                    <div className='w-full rounded-2xl p-4 bg-zinc-900 '>
                        <button className='p-2 rounded-full bg-zinc-800 hover:bg-red-700' onClick={deleteImage}>
                            <MdDelete />
                        </button>
                    </div>
                </section>

            </main>

            <div onClick={() => router.back()} className='fixed hover:bg-slate-500 top-40 left-4 p-2 bg-zinc-900 rounded-full' >
                <IoArrowBackOutline size={24} />
            </div>

            {/* <main className='select-none'>
                <div className=' flex  justify-center ' >
                    {images && (

                        <div className=' max-w-7xl w-full flex justify-center max-h-screen  p-4'>
                            <CldVideoPlayer
                                id='h2'
                                width="1280"
                                height="786"
                                src={`books/${params.id}`}
                                autoplay={true}
                                pictureInPictureToggle
                                colors={{
                                    accent: '#5d0577'
                                }}
                                logo={{
                                    imageUrl: 'https://res.cloudinary.com/dh01ngdjo/image/upload/v1724084500/Postafolio/ln8q7swr3oha19shdpwu.png',
                                    // imageUrl: '<Your Image URL',
                                    onClickUrl: 'https://cloudinary-pixelart.vercel.app/'
                                }}
                            />
                        </div>
                    )}
                </div>
            </main> */}



        </>

    )
}

export default ImgTarjet