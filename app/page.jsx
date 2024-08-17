
import React from 'react'
import { constatsLinks } from '@/constants/constatsLinks'
import TargetsPage from '@/components/Target'

const StartPage = () => {

    return (
        <main className='w-full  text-white'>
            <div className='p-6'>
                <div className='select-none py-10'>
                    <div className='flex justify-center  '>
                        <img className='rounded-xl mt-10 mb-10 shadow-[0_20px_50px_rgba(111,_113,_230,_0.5)]' src="https://res.cloudinary.com/dh01ngdjo/image/upload/v1708120673/FASHION/douma-demon-slayer_xlslp4.gif" alt="" />
                    </div>

                </div>
                <div className='p-4 bg-zinc-950'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi vero cum asperiores animi aliquam voluptatem placeat voluptatum laudantium excepturi! Totam accusamus, eveniet optio beatae fugit autem quam voluptatibus ipsa.
                </div>
                <TargetsPage value={constatsLinks} />
            </div>

        </main>
    )
}

export default StartPage