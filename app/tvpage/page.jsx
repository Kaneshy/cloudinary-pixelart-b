import React from 'react'

const TvPage = () => {
    return (
        <main className=''>
            <div className="tv-background select-none min-w-60 min-h-44 max-w-60 max-h-44">
                <div className='w-full h-full'>
                    <p className=" hover:text-green-600 blurred-text relative top-1/2 left-4 ">Game start</p>
                </div>
            </div>
            <div className="tv-background select-none min-w-60 min-h-44 max-w-60 max-h-44">
                <div className='w-full h-full'>
                    <p className=" hover:text-green-600 blurred-text relative top-1/2 left-4 ">Game start</p>
                </div>
            </div>

            <div className="tv-container">
                <div className="tv-screen">
                    <video 
                    autoPlay
                    controls
                    loop
                    className="tv-video"    >
                         <source src="https://res.cloudinary.com/dh01ngdjo/video/upload/v1723946302/videos/r0o6eb1xuxqkaqkgktwy.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className="tv-buttons">
                    <button className="tv-button"></button>
                    <button className="tv-button"></button>
                </div>
            </div>
        </main>


    )
}

export default TvPage