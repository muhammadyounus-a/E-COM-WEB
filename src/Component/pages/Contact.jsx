import React from 'react'

export default function Contact() {
  return (
    <div className='flex justify-center items-center p-20'>
        <div className="p-20 rounded-xl bg-white shadow-xl w-fit">
            <img className='h-16 w-auto' src="src/assets/images/logo-img.webp" alt="" />
            <h2 className='font-serif text-black mt-10'>Name:- younus_6124_</h2>
            <h2 className='font-serif text-black'>Email:- younusmuhammad8943@gmail.com</h2>
            <h2 className='font-serif text-black'>Phone:- 8943396124 </h2>
            <a href="https://wa.me/8934496124" target='_blank'><button className='bg-black px-8 py-2 text-white rounded-lg mt-10'>Connect Now</button></a>
        </div>
    </div>
  )
}
