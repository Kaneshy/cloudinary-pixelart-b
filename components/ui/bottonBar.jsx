'use client'
import { bottonBarC } from '@/constants/constatsLinks'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PopUpOpenerCdl from '../popup/popupCld'
import { IoMdCloudUpload } from "react-icons/io";
import UploadWidgetCdl from '../widget/UploadWidget'


const BottonBar = () => {
  const [isopen, setisopen] = useState(false)


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
        <button onClick={() => setisopen(!isopen)} className='p-2 justify-center flex items-center gap-2 '>
          <div><IoMdCloudUpload size={24}/></div>
          <p className='max-sm:hidden' >Uplaod</p>
        </button>
      </section>
      {isopen && (
        <UploadWidgetCdl isopen={isopen} setisopen={setisopen} />
      )

      }
    </main>
  )
}

export default BottonBar
