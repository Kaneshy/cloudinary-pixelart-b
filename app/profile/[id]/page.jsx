'use client'
import AddTagsPage from '@/components/popup/addTags';
import { GetTagsMB, RemoveTagsMB } from '@/lib/actions/db.actions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiFolderOn } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";




const ProfilePage = () => {

    const [data, setdata] = useState([])
    const [categorie, setcategorie] = useState(true)
    const [popupdelete, setpopupdelete] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            const res = await GetTagsMB()
            setdata(res)
        }
        fetchdata()
    }, [])

    const handleDelete = async (x) => {
        setpopupdelete("");
        const res = await RemoveTagsMB(x)
        setdata(res)
        console.log("Deleted:", x);
    }

    return (
        <main className='flex flex-col gap-4 mt-8 mb-40'>
            <section className='w-full flex flex-col gap-4 items-center'>
                <div className='h-20 w-20 '>
                    <img className='object-contain bg-zinc-900 rounded-full p-1' src="https://res.cloudinary.com/dztz492su/image/upload/v1724261351/books/itzjem5c813soe9ykwfz.png" alt="" />
                </div>
                <h1 className='font-bold text-4xl'>PIXEL GUY</h1>
                <h2 className='text-sm text-zinc-400'>kaneshiuchiha@gmail.com</h2>
            </section>
            <section className='w-full flex justify-center gap-8'>
                <button onClick={() => setcategorie(true)}
                    className={` ${categorie ? 'bg-blue-600 ' : 'bg-zinc-950'} p-2 rounded-xl  border border-zinc-700`}>Imagenes</button>
                <button onClick={() => setcategorie(false)}
                    className={` ${categorie ? 'bg-zinc-950' : 'bg-blue-600 '} p-2 rounded-xl  border border-zinc-700`}>Videos</button>
            </section>
            <main className='w-full'>
                <section className='bg-[#050505] max-w-a rounded-xl '>
                    <div className=' flex items-center justify-between p-6 w-full text-sm rounded-xl bg-[#080808] text-zinc-500  '>
                        <p>
                            {categorie ? 'Images' : 'Videos'}
                        </p>
                        <div>
                            <AddTagsPage setdata={setdata} />
                        </div>
                    </div>
                    <section className="p-2">
                        {categorie === true ? (
                            <section className="grid-c select-none">
                                {data.map((x, i) => {
                                    return (
                                        <section
                                            key={i}
                                            className="flex relative justify-between items-center bg-neutral-1000  p-3 rounded-xl border border-neutral-800 "
                                        >
                                            <Link href={`/categorie/${x}`} className="flex justify-between items-center hover:bg-neutral-950 px-2 rounded-xl">
                                                <div className="flex items-center">
                                                    <section className="items-center rounded-xl h-full flex justify-center">
                                                        <CiFolderOn size={"30"} />
                                                    </section>
                                                    <section className="flex flex-col gap-y-2 p-2">
                                                        <h1 className="text-body-bold">{x}</h1>
                                                    </section>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => setpopupdelete(popupdelete === x ? "" : x)}
                                                className="text-zinc-500 hover:scale-105 relative"
                                            >
                                                <SlOptionsVertical />
                                            </button>
                                            {popupdelete === x && (
                                                <div className="absolute z-10  top-14 right-2 bg-neutral-900 text-white p-3 rounded-md shadow-lg">
                                                    <div className="flex">
                                                        <button
                                                            onClick={() => handleDelete(x)}
                                                            className=" px-2 py-1 rounded-md"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </div>
                                            )}
                                        </section>
                                    );
                                })}
                            </section>
                        ) : (
                            <section className="grid-c select-none">
                                {data.map((x, i) => {
                                    return (
                                        <section
                                            key={i}
                                            className="flex relative justify-between items-center bg-neutral-1000  p-3 rounded-xl border border-neutral-800 "
                                        >
                                            <Link href={`/categorieVideo/${x}`} className="flex justify-between w-full items-center hover:bg-neutral-950 px-2 rounded-xl">
                                                <div className="flex items-center">
                                                    <section className="items-center rounded-xl h-full flex justify-center">
                                                        <CiFolderOn size={"30"} />
                                                    </section>
                                                    <section className="flex flex-col gap-y-2 p-2">
                                                        <h1 className="text-body-bold">{x}</h1>
                                                    </section>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => setpopupdelete(popupdelete === x ? "" : x)}
                                                className="text-zinc-500 hover:scale-105 relative"
                                            >
                                                <SlOptionsVertical />
                                            </button>
                                            {popupdelete === x && (
                                                <div className="absolute z-10 top-14 right-2 bg-neutral-900 text-white p-3 rounded-md shadow-lg">
                                                    <div className="flex">
                                                        <button
                                                            onClick={() => handleDelete(x)}
                                                            className=" px-2 py-1 rounded-md"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </div>
                                            )}
                                        </section>
                                    );
                                })}
                            </section>
                        )}
                    </section>
                </section>
            </main>



        </main>
    )
}

export default ProfilePage