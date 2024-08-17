'use client'
import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import UploadVideoWidget from '../uploadVideoWidget';
import { RiVideoAddFill } from "react-icons/ri";


const PopUpOpenerVideo = () => {

    const [isopen, setisopen] = useState(false)



    return (
        <main>
            <div className='fixed bottom-20 right-4 '>
                <div>
                    <button className=' p-4 bg-slate-950 rounded-2xl' onClick={() => setisopen(!isopen)}>
                        <RiVideoAddFill  size={'26'} />
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