'use client'
import React, { useState } from 'react'
import DBcategoriesPage from '../widget/dbcategories'

const AddTagsPage = () => {

    const [saverIsOpen, setsaverIsOpen] = useState(false)


  return (
    <main className='w-full flex items-center justify-center'>
        <button onClick={()=>setsaverIsOpen(!saverIsOpen)} className='p-2 w-full bg-zinc-700 text-white '>Add new categorie</button>
        {saverIsOpen && (
            <DBcategoriesPage saverIsOpen={saverIsOpen} setsaverIsOpen={setsaverIsOpen}  />
        )}
    </main>
  )
}

export default AddTagsPage