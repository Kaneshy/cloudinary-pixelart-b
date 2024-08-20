'use client'
import UploadOwnWidget from '@/components/uploadOwnWidget'
import React, { useState } from 'react'
import { FaImage } from "react-icons/fa";


const PopUpOpener = () => {

    const [isopen, setisopen] = useState(false)



    return (
        <main>
            <div className='fixed bottom-2 right-4 '>
                <div>
                    <button className=' p-4 bg-zinc-950 rounded-2xl' onClick={() => setisopen(!isopen)}>
                        <FaImage  size={'24'} />
                    </button>

                </div>
            </div>

            {isopen && (
                <UploadOwnWidget isopen={isopen} setisopen={setisopen} />
            )

            }
        </main>
    )
}

export default PopUpOpener