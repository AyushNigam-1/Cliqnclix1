import React from 'react';
import Navbar from '../../../components/Layout/Navbar';

export const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className='m-6' >
                <div className=' w-1/4 flex flex-col gap-4'>
                    <div className="flex justify-between gap-4">
                        {/* <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected >Year</option>
                            <option value="">2024</option>
                            <option value="">2023</option>
                            <option value="">2022</option>
                            <option value="">2021</option>
                        </select>
                        <select type="text" className='bg-gray-800 text-gray-300 p-2 rounded-md w-full my-2 font-medium' >
                            <option value="" selected >Status</option>
                            <option value="">Completed</option>
                            <option value="">Pending</option>
                            <option value="">Rejected</option>
                        </select> */}
                    </div>
                    {/* <div className=' bg-sky-600/25 rounded-md p-8 flex gap-12 flex-wrap justify-center'  >
                        <div className='flex flex-col align-center gap-2' >
                            <h6 className='text-gray-600'  > Downloads  </h6>
                            <div className='flex' >
                                <div className='flex gap-3 justify-center' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    <p className='text-4xl text-black' >
                                        21
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col align-center gap-2' >
                            <h6 className="text-gray-600" >   Earnings  </h6>
                            <div className='flex justify-center ' >
                                <div className='flex gap-3 justify-center' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <p className='text-4xl text-black' >
                                        21
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col align-center gap-2' >
                            <h6 className='text-nowrap text-gray-600' >  Available Earnings  </h6>
                            <div className='flex' >
                                <div className='flex gap-3 justify-center' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className='text-4xl text-black' >
                                        21
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='block rounded-lg p-4 shadow-sm shadow-black/25' >
                        <h1 className='text-3xl text-gray-500 font-bold mb-5' >This Week</h1>
                        <div className='flex gap-4  items-center flex-wrap'>
                            <div className='flex flex-row flex-wrap items-center gap-3' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(79 70 229)" className="w-8 h-8 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <div>
                                    <p className='text-sm text-gray-600 pb-2' >  Downloads  </p>
                                    <h6 className='text-lg font-medium'>24 <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            />
                                        </svg>

                                        <span className="text-xs font-medium"> 67.81% </span>
                                    </div></h6>
                                </div>
                            </div>
                            <div className='flex flex-row flex-wrap items-center gap-3 ' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(79 70 229)" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div>
                                    <p className='text-sm text-gray-600 pb-2' > Earnings  </p>
                                    <h6 className='text-lg font-medium '> 24 <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                            />
                                        </svg>
                                        <span className="text-xs font-medium"> 67.81% </span>
                                    </div>
                                    </h6>
                                </div>
                            </div>

                            <div className='flex flex-row flex-wrap items-center gap-3' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(79 70 229)" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div>
                                    <p className='text-sm text-gray-600 pb-2 ' > Available Earnings  </p>
                                    <h6 className='text-lg font-medium'>24   <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                            />
                                        </svg>

                                        <span className="text-xs font-medium"> 67.81% </span>
                                    </div></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
