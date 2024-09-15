'use client'
import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import UploadVideoWidget from '../uploadVideoWidget';
import { RiVideoAddFill } from "react-icons/ri";


const PopUpOpenerVideo = () => {

    const [isopen, setisopen] = useState(false)



    return (
        <main>
            <div className='fixed bottom-2 right-20 '>
                <div>
                    <button className=' p-4 bg-zinc-950 hover:bg-zinc-900 rounded-2xl' onClick={() => setisopen(!isopen)}>
                        <RiVideoAddFill  size={'24'} />
                    </button>

                </div>
            </div>

            {isopen && (
                <UploadVideoWidget isopen={isopen} setisopen={setisopen} />
            )

            }
        </main>
    )
}

export default PopUpOpenerVideo