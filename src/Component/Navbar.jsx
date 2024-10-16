import React, { useState } from 'react';
import logoImg from '../assets/images/logo-img.webp';
import { NavLink } from 'react-router-dom';
import CartComponent from './CartComponent';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  
  const cartItems = useSelector((state) => state.cart.items);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="navbar bg-white flex justify-between shadow-md">
      <div className="logo">
        <NavLink to="/">
          <img className='h-20 w-auto' src={logoImg} alt="Logo" />
        </NavLink>
        <div className="ml-10">
            <ul className='list-none flex gap-10'>
            <NavLink to="/home" className='text-black text-[18px]'>Home</NavLink>
            <NavLink to="/products" className='text-black text-[18px]'>Products</NavLink>
            <NavLink to="/contact" className='text-black text-[18px]'>Contact us</NavLink>
            </ul>
        </div>
      </div>
      <div className="navItems flex gap-7">
        <button className='flex items-center text-black text-[18px]' onClick={toggleCart}>
          <span className='mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path fill="currentColor" d="M19.5 22a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-10 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/>
                <path d="M5 4h17l-2 11H7zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2s.946 2 2.73 2H19.5"/>
              </g>
            </svg>
          </span>
          Cart
          <Badge count={cartItems.length} offset={[10, 10]} size='small' className='absolute top-6' >
        </Badge>
        </button>
        {cartVisible && <CartComponent />}

        <button className='flex items-center text-black text-[18px]'>
          <span className='mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
            </svg>
          </span>
          Login
        </button>
      </div>
    </div>
  )
}
