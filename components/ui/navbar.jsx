'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Categobar from './categobar'
import { GetTagsMB } from '@/lib/actions/db.actions'
import { CiFolderOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { FiChevronsDown } from "react-icons/fi";
import { IoMdClose } from 'react-icons/io'







const NavbarPage = () => {
    const pathname = usePathname()

    const [pathN, setpathN] = useState('')
    const [ArraySelected, setArraySelected] = useState([])
    const [popupcatego, setpopupcatego] = useState(false)
    const formRef = useRef(null)

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

    useEffect(() => {
        setpopupcatego(false)
    }, [pathname])


    useEffect(() => {

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setpopupcatego(false); // Close the form
            }
        };

        // Add event listener to detect clicks outside the form
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setpopupcatego]);


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
            <div className='flex items-center p-1'>
                <div className="flex p-2 overflow-x-auto select-none gap-4 items-center scrollbar-hide">
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
                <div
                    onClick={() => setpopupcatego(!popupcatego)}
                    className='bg-zinc-900 hover:bg-zinc-800 rounded-full py-2 flex h-full px-4'>
                    <FiChevronsDown />
                </div>
            </div>
            {popupcatego && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-end z-40">
                    <div className="w-full max-w-[400px] h-full bg-neutral-950 transform transition-transform duration-500 ease-in-out translate-x-0 overflow-auto">
                        <button
                            onClick={() => setpopupcatego(!popupcatego)}
                            className="p-4 items-end flex justify-end w-full text-white bg-opacity-30rounded-full z-50"
                        >
                            <IoMdClose />
                        </button>
                        <div
                            ref={formRef}
                            className="p-6 rounded-l-xl flex flex-col items-start space-y-4"
                        >
                            {ArraySelected.map((x, index) => (
                                <Link
                                    href={`/categorie${pathN + x}`}
                                    className="text-zinc-400 flex items-center hover:bg-zinc-800 bg-[#070707] rounded-xl whitespace-nowrap w-full py-2 px-4"
                                    key={index}
                                >
                                    <div className='px-2'>
                                        <CiFolderOn size={24} />
                                    </div>
                                    <div className="px-4 flex items-center gap-2 rounded-lg text-sm">
                                        {x}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </main>
    )
}

export default NavbarPage