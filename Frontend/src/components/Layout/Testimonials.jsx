import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
const Testimonials = () => {

    const testimonials = [{ name: "David", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia tenetur sunt error numquam est? Rem quibusdam error dolorum dicta unde. Tempore, ab voluptas?Lorem ipsum dolor sit amet consectetur adipisicing elit.  ", src: "https://th.bing.com/th/id/OIP._otwMtpHcoczJk7wSHcseAHaHa?w=600&h=600&rs=1&pid=ImgDetMain" }, { name: "George", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia tenetur sunt error numquam est? Rem quibusdam error dolorum dicta unde. Tempore, ab voluptas?Lorem ipsum dolor sit amet consectetur adipisicing elit.", src: "https://care.choc.org/wp-content/uploads/2016/05/Dr.Andrew_Mower_0699_2.jpg" }, { name: "John", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia tenetur sunt error numquam est? Rem quibusdam error dolorum dicta unde. Tempore, ab voluptas?Lorem ipsum dolor sit amet consectetur adipisicing elit.", src: "https://th.bing.com/th/id/OIP.RczZ4xzTOoFZPPnqHD5MYgHaJ3?w=488&h=650&rs=1&pid=ImgDetMain" }, { name: "Peter", review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia tenetur sunt error numquam est? Rem quibusdam error dolorum dicta unde. Tempore, ab voluptas?Lorem ipsum dolor sit amet consectetur adipisicing elit.", src: "https://th.bing.com/th/id/OIP.Skbr_PP7-7wWaxgf6-UMWAAAAA?rs=1&pid=ImgDetMain" }]
    return (
        <div className='flex flex-col items-center  gap-16 mb-12' >
            <h1 className='text-3xl font-bold text-white'>Testimonials</h1>
            {/* <Carousel autoPlay interval={3000} infiniteLoop centerMode showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} > */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {testimonials.map((el, i) => {
                    return (
                        <div key={i} className=' shadow-md flex flex-col gap-2  m-4 relative text-white max-w-xs bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 text-center rounded-lg p-3'>
                            <div className=' rounded-full '>
                                <img src={el.src} alt="" className=' m-auto rounded-full w-52 h-52 object-center object-cover' />
                            </div>
                            <div className=' h-full rounded-3xl'>
                                <h3 className='text-3xl mb-4  font-bold' >
                                    {el.name}
                                </h3>
                                <p className='text-base font-normal text-white/50'>
                                    {el.review}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* </Carousel> */}
        </div >
    )
}

export default Testimonials