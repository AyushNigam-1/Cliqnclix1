import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'
const Images = () => {
    const nav = useNavigate()
    const images = [{ path: "./pexels-ata-daftarifard-20440051.jpg", category: 'Fashion', icon: 'https://img.icons8.com/material-outlined/24/deciduous-tree.png' }, { path: "./pexels-larissa-farber-19919509.jpg", category: "Food" }, { path: "./pexels-equalstock-in-20344348.jpg", category: 'Urban', icon: 'https://img.icons8.com/material-outlined/24/hut.png' }, { path: "./pexels-cody-graphy-20434627.jpg", category: 'Flower', icon: '' }, { path: "./pexels-larissa-farber-19919509.jpg", category: "Food" }, { path: "./pexels-marieke-mol-20518865.jpg", category: "Kids", icon: 'https://img.icons8.com/material-outlined/24/kid.png' }, { path: "./pexels-yuliana-pavlova-20425642.jpg", category: 'Black & White' }, { path: "./pexels-adrian-rivero-20513314.jpg", category: 'Black & White' }]
    return (
        <div>
            <div className=' p-3  static '>
                <div className='mb-9' >
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white text-center '>Choose By Categories</h1>
                    <p className='text-gray-400 text-xs  m-1 text-center' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
                </div>
                {/* <SearchBar /> */}
                <div className='columns-1 md:columns-2 lg:columns-4 space-y-3 ' >
                    {
                        images.map(image => {
                            return (
                                <>
                                    <div className="relative  w-100 h-100 p shadow-md  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10  break-inside-avoid-column cursor-pointer" onClick={() => nav(`category/${(image.category).toLowerCase()}`)} >
                                        <img src={image.path} className=' w-full' />
                                        <div className=' '>
                                            <div className='flex items-center  justify-center '>
                                                {/* <p className='text-2xl py-3 font-normal text-center  text-nowrap  gap-2 bg-clip-text text-gray-200' >
                                                    {image.category}
                                                </p> */}
                                            </div>
                                        </div>
                                    </div >
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div >

    )
}

export default Images