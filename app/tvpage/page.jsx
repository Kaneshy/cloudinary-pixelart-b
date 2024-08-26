'use client'
import React, { useRef, useState } from 'react';

const TvPage = () => {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <main className='flex relative flex-col gap-8'>
            <div className="tv-background   z-40 select-none w-[1200px] h-[900px] ">

            </div>
            <video
                ref={videoRef}
                loop
                className="absolute video-x  z-10 "    >
                <source src="https://res.cloudinary.com/dztz492su/video/upload/v1724261665/books/gpikg4pzkb4hzhwksydt.mp4" type="video/mp4" />
            </video>
            <button
                onClick={togglePlayPause}
                className={`absolute ${isPlaying ? 'bg-green-950' : ''}  bg-opacity-40 top-[623px] h-8 w-12 z-50 left-[485px] translate-x-[-50%] px-4 py-2 text-white font-bold`}
            >
                {isPlaying ? '' : ''}
            </button>

        </main>


    )
}

export default TvPage