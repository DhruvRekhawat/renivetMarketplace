import React from 'react'

const Waiting = () => {
  return (
    <main className='pt-32 md:pt-40 flex flex-col gap-4 p-4 justify-center items-center bg-brand-offwhite'>
    <h2 className='w-full text-center text-4xl md:text-6xl text-brand-brown'> Thank you for applying! </h2>
    <p className='md:w-2/3 w-auto text-center'>Our team is reviewing your application, we will notify you once approved</p>
    </main>
  )
}

export default Waiting