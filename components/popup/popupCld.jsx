'use client'
import React, { useState } from 'react'
import { RiVideoAddFill } from "react-icons/ri";
import UploadWidgetCdl from '../widget/UploadWidget';
import { GrMultiple } from "react-icons/gr";



const PopUpOpenerCdl = () => {

    const [isopen, setisopen] = useState(false)



    return (
        <main>
            <div className='fixed bottom-2  right-36 '>
                <div>
                    <button className=' p-4 bg-zinc-950 rounded-2xl' onClick={() => setisopen(!isopen)}>
                        <GrMultiple   size={'24'} />
                    </button>

                </div>
            </div>

            {isopen && (
                <UploadWidgetCdl isopen={isopen} setisopen={setisopen} />
            )

            }
        </main>
    )
}

export default PopUpOpenerCdl