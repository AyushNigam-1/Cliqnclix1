import React from 'react'

const Pagination = ({ totalPage, page, setPage }) => {
    console.log(totalPage, page)
    return (
        <div className='flex justify-center lg:gap-3 gap-2'>
            <div className='bg-gray-400/35 text-white rounded-full p-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            {
                Array.from({ totalPage }, (_, index) => totalPage + page).map(page =>
                    <div key={page} onClick={() => setPage(page)} className='backdrop-filter p-2 px-4 rounded-md text-gray-200  backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10'>
                        {page}
                    </div>
                )
            }
            <div className='bg-gray-400/35 text-white rounded-full p-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    )
}

export default Pagination