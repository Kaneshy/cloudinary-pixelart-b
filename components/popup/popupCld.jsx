'use client'
import React, { useState } from 'react'
import { RiVideoAddFill } from "react-icons/ri";
import UploadWidgetCdl from '../widget/UploadWidget';
import { GrMultiple } from "react-icons/gr";



const PopUpOpenerCdl = () => {

    const [isopen, setisopen] = useState(false)



    return (
        <main>
            <div className='fixed bottom-36  right-4 '>
                <div>
                    <button className=' p-4 bg-slate-950 rounded-2xl' onClick={() => setisopen(!isopen)}>
                        <GrMultiple   size={'26'} />
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