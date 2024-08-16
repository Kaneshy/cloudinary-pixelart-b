'use client'
import UploadOwnWidget from '@/components/uploadOwnWidget'
import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";


const PopUpOpener = () => {

    const [isopen, setisopen] = useState(false)

    

    return (
        <main className='fixed bottom-4 right-4 '>
            <div>
                <button className=' p-4 bg-slate-950 rounded-2xl' onClick={() => setisopen(!isopen)}>
                <IoMdCloudUpload size={'26'} />
                </button>
                
            </div>
            {isopen && (
                <UploadOwnWidget isopen={isopen} setisopen={setisopen}/>
            )

            }
        </main>
    )
}

export default PopUpOpener