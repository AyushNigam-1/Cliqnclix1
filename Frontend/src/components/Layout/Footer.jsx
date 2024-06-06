import React from 'react'

const Footer = () => {
    const items = [{ primary: 'Quick Links', secondary: ['Home', 'About Us', 'Shop', 'Free Vector Images', 'Cart', 'Checkout', 'Offers', 'Become a Contributor', 'Contact Us'] }, { primary: 'User Information', secondary: ['Login', 'Register', 'My Account', 'Wishlist', 'Sitemap'] }, { primary: 'Company Legal', secondary: ['Frequently Ask Questions', 'Products and Pricing', 'License Agreement', 'Refund and Cancellation Policy', 'Privacy Policy', 'Terms & Conditions'] }]
    return (
        <div className='bg-gray-800 p-4'>
            <div className='flex gap-5 justify-around' >
                {items.map((item, i) => {
                    return (<>
                        <div key={i} className='flex flex-col gap-3 text-center'>
                            <div className='text-base font-bold text-gray-200'>
                                {item.primary}
                            </div>
                            <div className='flex flex-col gap-3'>
                                {item.secondary.map((i, ind) => {
                                    return (
                                        <div key={ind} className='text-sm font-bold text-gray-400'>
                                            {i}
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </>
                    )
                })}
            </div>
            <div className='flex gap-5 justify-center mt-4' >
                <img width="40" height="50" src="https://img.icons8.com/ios-filled/40/FFFFFF/facebook-new.png" alt="facebook-new" />
                <img width="40" height="50" src="https://img.icons8.com/ios-filled/40/FFFFFF/twitter.png" alt="twitter" />
                <img width="40" height="50" src="https://img.icons8.com/ios-filled/40/FFFFFF/youtube-play.png" alt="youtube-play" />
                <img width="40" height="50" src="https://img.icons8.com/ios-filled/40/FFFFFF/linkedin.png" alt="linkedin" />
                <img width="40" height="50" src="https://img.icons8.com/ios-filled/40/FFFFFF/pinterest--v1.png" alt="pinterest--v1" />
            </div>
            <h1 className='text-center text-gray-200 mt-4 text-xs'>
                © 2023 CLIQNCLIX. All Rights Reserved
            </h1>
        </div>
    )
}

export default Footer