import React from 'react'
import fashionIcon from '../../assets/clothes-hanger-svgrepo-com.svg'
import ruralIcon from '../../assets/village-svgrepo-com.svg'
import ideasIcon from '../../assets/idea-lamp-marketing-svgrepo-com.svg'
import shoppingIcon from '../../assets/shopping-cart-svgrepo-com.svg'
import techIcon from '../../assets/global-technology-services-svgrepo-com.svg'
import lifestyleIcon from '../../assets/person-male-svgrepo-com.svg'
const CategoryStrip = () => {
    const categories = [{ name: "Fashion", path: fashionIcon }, { name: "Technology", path: techIcon }, { name: "Rural", path: ruralIcon }, { name: "Lifestyle", path: lifestyleIcon }, { name: "Ideas", path: ideasIcon }, { name: "Shoping", path: shoppingIcon }, { name: "Technology", path: techIcon }, { name: "Rural", path: ruralIcon }, { name: "Lifestyle", path: lifestyleIcon }, { name: "Ideas", path: ideasIcon }, { name: "Shoping", path: shoppingIcon }, { name: "Shoping", path: shoppingIcon }, { name: "Technology", path: techIcon }, { name: "Rural", path: ruralIcon }, { name: "Lifestyle", path: lifestyleIcon }, { name: "Ideas", path: ideasIcon }, { name: "Shoping", path: shoppingIcon }]
    // iconbg: "rgb(0,255,0,0.10)",
    // iconColor: 'rgb(0,255,0)'
    return (
        <div className='flex gap-4 m-4  m-w-screen items-center'>
            <div className='bg-gray-400/35 text-white rounded-full p-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className='flex gap-4  overflow-hidden ' >
                {categories.map((category, i) => <div key={i} style={{ backgroundColor: category.name == 'Fashion' ? 'rgb(31 41 55)' : 'white', color: category.name == 'Fashion' ? 'rgb(255 255 255)' : 'gray' }} className=' rounded-md p-3 text-base  flex gap-2 items-center shadow-md '>
                    {/* <img src={category.path} alt="" className='w-6 text-green-800' /> */}
                    {category.name} {category.name == 'Fashion' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> : ''}  </div>)}
            </div >
            <div className='bg-gray-400/35 text-white rounded-full p-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    )
}

export default CategoryStrip