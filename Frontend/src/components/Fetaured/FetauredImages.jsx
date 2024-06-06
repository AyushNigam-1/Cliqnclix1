import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const FetauredImages = () => {
    const images = [{ path: "./pexels-ata-daftarifard-20440051.jpg", category: 'Nature', icon: 'https://img.icons8.com/material-outlined/24/deciduous-tree.png' }, { path: "./pexels-equalstock-in-20344348.jpg", category: 'Urban', icon: 'https://img.icons8.com/material-outlined/24/hut.png' }, { path: "./pexels-marieke-mol-20518865.jpg", category: "Kids", icon: 'https://img.icons8.com/material-outlined/24/kid.png' }, { path: "./pexels-equalstock-in-20344348.jpg", category: 'Urban', icon: 'https://img.icons8.com/material-outlined/24/hut.png' }, { path: "./pexels-marieke-mol-20518865.jpg", category: "Kids", icon: 'https://img.icons8.com/material-outlined/24/kid.png' }]


    return (
        <div className='w-100  m-3 rounded-3xl  flex flex-col gap-8'>
            <div className='rounded-3xl flex items-center justify-center'>
                <div className='flex flex-col gap-4  z-50   text-center p-3 w-100 ' >
                    <h1 className='xl:text-5xl text-4xl font-black  text-wrap text-center m-auto text-gray-200 '>Explore Our Most Liked Categories and Most Downloaded Photos</h1>
                    <p className='text-gray-300 text-md '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis similique </p>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-8">
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='rounded-full  p-4 flex justify-center items-center bg-gradient-to-tr from-blue-400 to-red-400 text-gray-200' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                            </svg>
                        </div>
                        <h1 className='text-gray-200 text-2xl  xl:text-3xl font-bold text-center'>Popular Categories</h1>
                    </div>

                    <Carousel centerMode autoPlay infiniteLoop interval={2000} showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} centerSlidePercentage={window.innerWidth < 640 ? 85 : window.innerWidth <= 768 ? 70 : window.innerWidth < 1024 ? 60 : window.innerWidth < 1536 ? 30 : 30}>
                        {

                            images.map((image, i) => {
                                return (
                                    <div key={i} className='sm:m-2 m-2  shadow-md  backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 ' >
                                        <img src={image.path} alt="" />
                                        {/* <h2 className='xl:text-2xl text-xl xl:py-3 py-2  font-normal text-center  text-nowrap  gap-2 bg-clip-text text-gray-200'>
                                            {image.category}
                                        </h2> */}
                                        {/* <h1 className='text-white'>
                                            750
                                        </h1> */}
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='rounded-full w-min p-4 flex justify-center items-center bg-gradient-to-tr from-blue-400 to-red-400 text-gray-200' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                        <h1 className='text-gray-200 text-2xl  xl:text-3xl font-bold text-center'>Popular Photos</h1>
                    </div>
                    <Carousel centerMode autoPlay infiniteLoop interval={2000} showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} centerSlidePercentage={window.innerWidth < 640 ? 85 : window.innerWidth <= 768 ? 70 : window.innerWidth < 1024 ? 60 : window.innerWidth < 1536 ? 30 : 30}>
                        {
                            images.map((image, i) => {
                                return (
                                    <div key={i} className='sm:m-2 m-2 shadow-md backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 ' >
                                        <img src={image.path} alt="" />
                                        <div className=''>
                                            {/* <h2 className='xl:text-2xl text-xl xl:py-3 py-2 font-normal text-center  text-nowrap  gap-2 bg-clip-text text-gray-200'>
                                                {image.category}
                                            </h2> */}
                                            {/* <h1 className='text-white'>
                                                750
                                            </h1> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default FetauredImages