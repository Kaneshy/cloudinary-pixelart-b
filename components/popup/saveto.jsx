import React, { useState } from 'react'
import SaverTargetPage from '../widget/saverTarget'
import { CiShoppingTag } from "react-icons/ci";


const SavetoPage = ({ pId }) => {

  const [saverIsOpen, setsaverIsOpen] = useState(false)


  return (
    <main className=''>
      <button onClick={() => setsaverIsOpen(!saverIsOpen)} className='p-2 '>
        <CiShoppingTag size={24} />
      </button>
      {saverIsOpen && (
        <SaverTargetPage pId={pId} saverIsOpen={saverIsOpen} setsaverIsOpen={setsaverIsOpen} />
      )}
    </main>
  )
}

export default SavetoPage