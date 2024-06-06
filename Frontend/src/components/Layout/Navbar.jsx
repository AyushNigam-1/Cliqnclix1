import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
const Navbar = () => {
  const wishListItems = useSelector(state => state.user.user?.wishlist)
  const cartItems = useSelector(state => state.user.user?.cart)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const nav = useNavigate()
  return (
    <>
      <nav className="bg-gray-800 shadow-md ">
        <div className=" px-2 sm:px-6 lg:px-4">
          <div className="relative flex py-3 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <h1 className='text-gray-200 font-bold text-xl '>
                  Cliqnclix
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link to="/" href="#" className="bg-gray-700 text-white rounded-md px-6 py-3 text-sm font-medium" aria-current="page">Home</Link>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-3 text-sm font-medium">About us</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-3 text-sm font-medium">Contact us</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-6 py-3 text-sm font-medium">FAQ</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 md:flex hidden text-white items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4 ">
              <button type="button" onClick={() => nav("/wishlist")} className="relative inline-flex items-center text-sm font-medium text-center   focus:outline-none    bg-gray-900 text-gray-200 p-3  rounded-full" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span className="sr-only">Notifications</span>
                {wishListItems?.length ?
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white  bg-gradient-to-tr  from-blue-400 to-red-400  rounded-full -top-2 -end-2 dark:border-gray-900">{wishListItems?.length}</div> : ""}
              </button>
              <button onClick={() => nav("/cart")} c className='relative bg-gray-900 text-gray-200 p-3  rounded-full '>
                {cartItems?.length ? <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white  bg-gradient-to-tr  from-blue-400 to-red-400  rounded-full -top-2 -end-2 dark:border-gray-900">{cartItems?.length}</div> : ""}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="sr-only">Notifications</span>

              </button>
              {
                Cookies.get("token") ?
                  <div className="relative ">
                    <button onClick={() => toggleDropdown()} className='z-50 bg-gray-900 text-gray-200 p-3  rounded-full '>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      <span className="sr-only">Notifications</span>
                    </button>
                    {isOpen && (
                      <div className="absolute bg-gray-700 py-2 w-32 shadow-lg rounded-lg mt-2 right-1 z-auto" >
                        <Link to="/account" className="block px-4 py-2  z-50 ">My Account</Link>
                        <a href="#" className="block px-4 py-2  z-50">Orders</a>
                        <a href="#" className="block px-4 py-2  z-50">Donwloads</a>
                        <a href="#" className="block px-4 py-2  z-50">Logout</a>
                      </div>
                    )}
                  </div> :
                  <button onClick={() => nav("/login")} className='bg-/40 rounded-md  text-white px-6 py-3 shadow-md  font-semibold  bg-gray-700 flex items-center'>
                    Login  </button>
              }
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar