import React from 'react'
import Navbar from '../../components/Layout/Navbar'
import Search2 from '../../components/Home/SearchBar/SearchBar'
import Images from '../../components/Home/ImageGrid/Images'
import FetauredImages from '../../components/Fetaured/FetauredImages'
import MainLayout from '../../components/Layout/MainLayout'
import HeroSection from '../../components/Home/HeroSection'
import Testimonials from '../../components/Layout/Testimonials'

const Homepage = () => {
    return (
        <MainLayout component={
            <div className='flex flex-col gap-10'>
                <HeroSection />
                <Images />
                <FetauredImages />
                <Testimonials />
            </div>
        }>
        </MainLayout>
    )
}

export default Homepage