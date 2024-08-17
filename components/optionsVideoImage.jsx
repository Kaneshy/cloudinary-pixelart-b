import React, { useState } from 'react'
import UploadOwnWidget from './uploadOwnWidget'
import UploadVideoWidget from './uploadVideoWidget'

const OptionsVideoImage = ({ activeA, setactiveA }) => {
    const [isopen, setisopen] = useState(false)

    

    return (
        <main className='centered-div '>
            <div>section</div>
            <div>
                <button className='p-2 bg-blue-600' onClick={() => setisopen(false)}>upload</button>
                <button className='p-2 bg-blue-600' onClick={() => setisopen(true)}>upload</button>
            </div>
            {isopen ? (
                <UploadOwnWidget isopen={isopen} setisopen={setisopen}/>
            ) : (
                <UploadVideoWidget isopen={isopen} setisopen={setisopen}/>
            )}
        </main>
    )
}

export default OptionsVideoImage