import React from 'react'

export default function Footer() {
  return (
    <footer className="footer bg-white text-base-content p-10 pt-20 mt-10">
        <aside>
            <img className=' h-20 w-auto' src="src/assets/images/logo-img.webp" alt="" />
            <p className="text-black text-[17px] font-semibold mt-3">
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
            </p>
        </aside>
        <nav>
            <h6 className="text-black font-bold text-[22px]">Services</h6>
            <a className="text-black text-[17px] font-semibold mt-3">Branding</a>
            <a className="text-black text-[17px] font-semibold mt-3">Design</a>
            <a className="text-black text-[17px] font-semibold mt-3">Marketing</a>
            <a className="text-black text-[17px] font-semibold mt-3">Advertisement</a>
        </nav>
        <nav>
            <h6 className="text-black font-bold text-[22px]">Company</h6>
            <a className="text-black text-[17px] font-semibold mt-3">About us</a>
            <a className="text-black text-[17px] font-semibold mt-3">Contact</a>
            <a className="text-black text-[17px] font-semibold mt-3">Jobs</a>
            <a className="text-black text-[17px] font-semibold mt-3">Press kit</a>
        </nav>
        <nav>
            <h6 className="text-black font-bold text-[22px]">Legal</h6>
            <a className="text-black text-[17px] font-semibold mt-3">Terms of use</a>
            <a className="text-black text-[17px] font-semibold mt-3">Privacy policy</a>
            <a className="text-black text-[17px] font-semibold mt-3">Cookie policy</a>
        </nav>
        </footer>
  )
}
