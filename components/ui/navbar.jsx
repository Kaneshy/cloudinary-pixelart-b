'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Categobar from './categobar'
import { GetTagsMB } from '@/lib/actions/db.actions'
import { CiFolderOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";





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
            <nav className='w-full max-sm:hidden justify-around   flex p-4'>
                <Link href={'/categorie/All'} className='max-lg:hidden  pixelify-sans py-2 px-4 font-bold flex  gap-2 items-center rounded-xl hover:text-purple-700  '>
                    <CiImageOn size={'20'} />
                    <p>Picutres</p>
                </Link>
                <div className='flex justify-center pixelify-sans'>
                    <Link href='/' className='gradient-text pl-4 font-extrabold text-3xl flex-1 '>PIXELART</Link>
                </div>
                <Link href={'/categorieVideo/All'} className='max-lg:hidden pixelify-sans py-2 px-4 font-bold  flex  gap-2 items-center rounded-xl hover:text-purple-700'>
                    <CiVideoOn size={'20'} />
                    <p>Videos</p>
                </Link>
                {/* <div className='flex max-lg:hidden  gap-4 text-sm  justify-around  items-end'>
                    
                    
                </div> */}
            </nav>
            <div className="flex p-2 overflow-x-auto select-none gap-4 items-center scrollbar-hide">
                <Link href={`/categorie${pathN}All`} className=" border  text-sm border-zinc-500  text-zinc-400   hover:bg-zinc-900 bg-black rounded-xl whitespace-nowrap">
                    <div className="px-4 py-1 flex items-center gap-2 rounded-lg text-sm">
                        <CiFolderOn />
                        <p>
                            All
                        </p>
                    </div>
                </Link>
                {ArraySelected.map((x, index) => (
                    <Link href={`/categorie${pathN + x}`} className=" border border-zinc-500  text-zinc-400   hover:bg-zinc-900 bg-black rounded-xl whitespace-nowrap" key={index}>
                        <div className="px-4 py-1 flex items-center gap-2 rounded-lg text-sm">
                            <CiFolderOn />
                            <p>
                                {x}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default NavbarPage