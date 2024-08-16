'use client'
import UploadOwnWidget from '@/components/uploadOwnWidget'
import React, { useState } from 'react'


const UploadPage = () => {

    const [isopen, setisopen] = useState(false)

    

    return (
        <main>
            <div>section</div>
            <div>
                <button className='p-2 bg-blue-600' onClick={() => setisopen(!isopen)}>upload</button>
            </div>
            {isopen && (
                <UploadOwnWidget isopen={isopen} setisopen={setisopen}/>
            )

            }
        </main>
    )
}

export default UploadPage