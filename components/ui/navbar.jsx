'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Categobar from './categobar'
import { GetTagsMB } from '@/lib/actions/db.actions'
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";


const NavbarPage = () => {
    const pathname = usePathname()

    const array1 = ['All', 'anime', 'books', 'drawing', 'art', 'Art']
    const VideosArray = ['All', 'music', 'nature', 'IRL', 'comedy', 'learning', 'film', 'animation', 'retro']
    const [pathN, setpathN] = useState('')
    const [ArraySelected, setArraySelected] = useState([])

    useEffect(() => {
        if (pathname.startsWith('/categorie/')) {
            // Do something if pathname starts with /categorie
            console.log('Pathname starts with /categorie:', pathname)
            const prepareTags = async () => {
                const categoriesArray = await GetTagsMB()
                setpathN('/')
                setArraySelected(categoriesArray)
            };
            prepareTags()
        } else if (pathname.startsWith('/categorieVideo')) {
            // Do something else if pathname starts with /categorieVideo
            console.log('Pathname starts with /categorieVideo:', pathname)
            const prepareTags = async () => {
                const categoriesArray = await GetTagsMB()
                setpathN('Video/')
                setArraySelected(categoriesArray)
            };
            prepareTags()
        } else {
            // Default action if pathname does not match the above conditions
            console.log('Pathname does not match /categorie or /categorieVideo:', pathname)
        }
    }, [pathname])

    return (
        <main className='select-none bg-black '>
            <Categobar />
            <nav className='w-full max-sm:hidden   flex p-4'>
                <div className='flex-1 pixelify-sans'>
                    <Link href='/' className='gradient-text pl-4 font-extrabold text-3xl flex-1 '>PIXELART</Link>
                </div>
                <div className='flex  gap-4 text-sm max-sm:w-full justify-around  items-end'>
                    <Link href={'/categorie/All'} className='py-2 px-4 font-bold flex  gap-2 items-center rounded-xl hover:text-purple-700  '>
                        <FaImage size={'24'} />
                        <p>Picutres</p>
                    </Link>
                    <Link href={'/categorieVideo/All'} className='py-2 px-4 font-bold  flex  gap-2 items-center rounded-xl hover:text-purple-700'>
                        <FaVideo size={'24'} />
                        <p>Videos</p>
                    </Link>
                </div>
            </nav>
            <div className="flex p-2 overflow-x-auto select-none gap-4 items-center scrollbar-hide">
                <Link href={`/categorie${pathN}All`} className="transition text-zinc-400 duration-300 ease-in-out transform hover:text-purple-700 hover:scale-105 bg-black rounded-xl whitespace-nowrap">
                    <div className="px-4 py-1 rounded-lg">All</div>
                </Link>
                {ArraySelected.map((x, index) => (
                    <Link href={`/categorie${pathN + x}`} className="transition text-zinc-400 duration-300 ease-in-out transform hover:text-purple-700 hover:scale-105 bg-black rounded-xl whitespace-nowrap" key={index}>
                        <div className="px-4 py-1 rounded-lg">
                            {x}
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default NavbarPage