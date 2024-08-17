import React from 'react'
import Link from 'next/link'


const NavbarPage = () => {

    const array1 = ['All', 'anime', 'books', 'drawing']

    return (
        <main className='select-none'>
            <nav className='w-full flex p-4'>
                <Link href='/Start' className='flex-1 text-lg font-bold'>PIXELART</Link>
                <div className='flex gap-4 text-sm justify-end items-end'>
                    <Link href={'/categorie/All'} className='py-2 px-4 rounded-xl  hover:bg-zinc-700'>IMAGES</Link>
                    <Link href={'/categorieVideo/All'} className='py-2 px-4  rounded-xl  hover:bg-zinc-700'>VIDEOS</Link>
                </div>
            </nav>
            <div className='flex p-4 bg-zinc-950 select-none flex-row gap-4 items-center justify-center'>
                {array1.map((x, index) => (
                    <Link href={`/categorie/${x}`} className='transition text-zinc-400 duration-300 ease-in-out transform hover:text-white  hover:scale-105  bg-zinc-800 rounded-xl' key={index}>
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