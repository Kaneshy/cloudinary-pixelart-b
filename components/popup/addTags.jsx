'use client'
import React, { useState } from 'react'
import DBcategoriesPage from '../widget/dbcategories'
import { IoAdd } from "react-icons/io5";

const AddTagsPage = ({setdata}) => {

  const [saverIsOpen, setsaverIsOpen] = useState(false)


  return (
    <main className='w-full  flex items-center justify-center'>
      <button onClick={() => setsaverIsOpen(!saverIsOpen)}
        className={'text-white p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 border border-transparent transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-purple-500'}
      >
        <IoAdd size={30} />
      </button>
      {saverIsOpen && (
        <DBcategoriesPage saverIsOpen={saverIsOpen} setsaverIsOpen={setsaverIsOpen} setdata={setdata} />
      )}
    </main>
  )
}

export default AddTagsPage