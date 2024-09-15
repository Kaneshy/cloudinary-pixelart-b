'use client'

import Link from 'next/link'

const TargetsPage = ({value}) => {

    return (
        <section className='grid-a select-none '>
            {value.map((x, i) => {
                return (
                    <Link
                        href={`${x.link}`}
                        key={i}
                        className='flex justify-between mb-60 flex-col bg-neutral-1000 p-3 rounded-xl border border-neutral-800 hover:border-neutral-50'>
                        <section className='items-center bg-zinc-950 rounded-xl h-full flex justify-center'>
                            <img className='object-contain '  src={x.imgUrl} alt="" />
                        </section>
                        <section className='flex flex-col gap-y-2 p-2'>
                            <h1 className='text-body-bold '>{x.title} </h1>
                            <p className='text-small-semibold text-neutral-400'>{x.desc}</p>
                        </section>
                    </Link>
                )
            })}
        </section>
    )
}

export default TargetsPage