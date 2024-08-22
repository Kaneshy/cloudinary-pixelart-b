'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GetTagsMB } from '@/lib/actions/db.actions'


const Categobar = () => {

    // useEffect(() => {
    //     const fetchdata = async () => {
    // const userInfo = await GetTagsMB();
    // console.log(userInfo)
    // }, [])
    const [categoriesArray, setcategoriesArray] = useState([])

    useEffect(() => {
        prepareTags()
    }, [])





    const prepareTags = async () => {
        const categoriesArray = await GetTagsMB({})
        setcategoriesArray(categoriesArray)
    };

    return (
        <main className='select-none mb-4'>
            {/* <div className='flex p-2 overflow-x-auto centered-bar bg-zinc-950 select-none flex-row gap-4 items-center justify-center'>
                {categoriesArray.map((x, index) => (
                    <Link href={`/categorie${pathN + x}`} className='transition text-zinc-400 duration-300 ease-in-out transform hover:text-purple-700  hover:scale-105  bg-black rounded-xl' key={index}>
                        <div className=' px-4 py-1 rounded-lg '>
                            {x}
                        </div>
                    </Link>

                ))}
            </div> */}
        </main>
    )
}

export default Categobar