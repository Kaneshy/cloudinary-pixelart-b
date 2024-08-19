'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const NavbarPage = () => {
    const pathname = usePathname()

    const array1 = ['All', 'anime', 'books', 'drawing']
    const VideosArray = ['All', 'music', 'trailer', 'anime', 'books']
    const [pathN, setpathN] = useState('')
    const [ArraySelected, setArraySelected] = useState([])

    useEffect(() => {
        if (pathname.startsWith('/categorie/')) {
            // Do something if pathname starts with /categorie
            console.log('Pathname starts with /categorie:', pathname)
            setpathN('/')
            setArraySelected(array1)
        } else if (pathname.startsWith('/categorieVideo')) {
            // Do something else if pathname starts with /categorieVideo
            console.log('Pathname starts with /categorieVideo:', pathname)
            setpathN('Video/')
            setArraySelected(VideosArray)
        } else {
            // Default action if pathname does not match the above conditions
            console.log('Pathname does not match /categorie or /categorieVideo:', pathname)
        }
    }, [pathname])

    return (
        <main className='select-none'>
            <nav className='w-full flex p-4'>
                <div className='flex-1'>
                    <Link href='/' className='gradient-text flex-1 text-xl font-bold'>PIXELART</Link>
                </div>
                <div className='flex gap-4 text-sm justify-end items-end'>
                    <Link href={'/categorie/All'} className='py-2 px-4 rounded-xl  hover:bg-zinc-700'>IMAGES</Link>
                    <Link href={'/categorieVideo/All'} className='py-2 px-4  rounded-xl  hover:bg-zinc-700'>VIDEOS</Link>
                </div>
            </nav>
            <div className='flex p-4 bg-zinc-950 select-none flex-row gap-4 items-center justify-center'>
                {ArraySelected.map((x, index) => (
                    <Link href={`/categorie${pathN + x}`} className='transition text-zinc-400 duration-300 ease-in-out transform hover:text-white  hover:scale-105  bg-zinc-800 rounded-xl' key={index}>
                        <div className=' px-4 py-1 rounded-lg '>
                            {x}
                        </div>
                    </Link>

                ))}
            </div>
        </main>
    )
}

export default NavbarPage