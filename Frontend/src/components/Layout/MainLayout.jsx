import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Services from './Services'

const MainLayout = ({ component }) => {
    const style = {}

    return (
        <div className='  bg-gradient-to-r bg-gray-900' >
            <Navbar />
            <div>
                {component}
            </div>
            <Services />
            <Footer />

        </div>
    )
}

export default MainLayout