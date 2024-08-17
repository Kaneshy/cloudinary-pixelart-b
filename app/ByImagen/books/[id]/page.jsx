'use client'
import { redirect, useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { DeleteImagebyPublicId } from '@/lib/actions/upload.actions';
import { MdDelete } from "react-icons/md";




const ImgTarjet = ({ params }) => {
    const router = useRouter()
    const [preloadingA, setpreloadingA] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setpreloadingA(true)
        }, 50);

    }, [])

    const deleteImage = async () => {
        const res = await DeleteImagebyPublicId({ publicIdA: `books/${params.id}` })
        if(res.result=='ok'){
            router.push('/categorie/All')
        } else {
            console.log('Error at deleting request')
        }
        console.log(res.result)
    }

    return (
        <>
            {preloadingA && (
                <main>
                    <div className='it-container flex  justify-center ' >
                        <div className=' max-w-2xl it-b-container w-full flex justify-center max-h-screen  p-4' >
                            <CldImage
                                width="1000"
                                height="800"
                                src={`/books/${params.id}`}
                                sizes="100vw"
                                alt="Description of my image"
                                priority={true}
                                className=' '
                            />
                        </div>

                    </div>
                    <section className='p-4 flex justify-start items-start text-start'>
                        <div className='w-full rounded-2xl p-4 bg-zinc-900 '>
                            <button className='p-2 rounded-full bg-zinc-800 hover:bg-red-700' onClick={deleteImage}>
                                <MdDelete />
                            </button>
                        </div>
                    </section>

                </main>


            )}
            <div onClick={() => router.back()} className='fixed hover:bg-slate-500 top-40 left-4 p-2 bg-slate-900 rounded-full' >
                <IoArrowBackOutline size={24} />
            </div>
        </>

    )
}

export default ImgTarjet