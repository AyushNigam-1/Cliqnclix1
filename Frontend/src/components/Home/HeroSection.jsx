import React from 'react'

const HeroSection = () => {
    return (
        <div>
            <div className='relative  w-100 xl:grid xl:grid-cols-2 h-[92vh] overflow-hidden rounded-s-3xl' >
                <div className=' xl:col-span-1' >
                    <div className=' absolute xl:relative z-50 top-1/2 flex-col flex  xl:items-start   transform  -translate-y-1/2  p-4 gap-4 '>
                        <h1 className='text-6xl md:text-7xl font-black  text-wrap text-gray-200 '>Explore High Quality Images & Videos</h1>
                        <p className='text-gray-400 text-sm m-2  xl:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique repellat animi blanditiis itaque,? Veritatis similique repellat animi blanditiis itaque,?</p>
                        <button className='text-white px-10 py-4   w-min  rounded-lg text-lg  p-5 text-nowrap font-bold bg-gradient-to-tr from-blue-400   to-red-400'>
                            Explore Now
                        </button>
                    </div>
                </div>
                <div className='xl:col-span-1 mx-auto absolute xl:relative '>
                    <img src="./bg3.jpg" alt="" className=' object-center h-[92vh] w-screen object-cover filter blur-sm xl:blur-none overflow-hidden' />
                </div>
            </div>
        </div>
    )
}

export default HeroSection