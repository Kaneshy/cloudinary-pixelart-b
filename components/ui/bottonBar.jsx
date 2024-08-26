'use client'
import { bottonBarC } from '@/constants/constatsLinks'
import Link from 'next/link'
import React, { useState } from 'react'

const BottonBar = () => {

  return (
    <main className='lg:hidden '>
      <section className='flex p-2 justify-evenly bg-black gap-2 w-full '>
        {bottonBarC.map((x, index) => {
          return (
            <Link href={x.route} key={index} className='p-2 justify-center flex items-center gap-2 '>
              <div>{x.logo}</div>
              <p className='max-sm:hidden' >{x.name}</p>
            </Link>
          )
        })}
      </section>
    </main>
  )
}

export default BottonBar
