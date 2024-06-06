import React, { useState, useEffect } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { Carousel } from 'react-responsive-carousel'
import { useLocation } from 'react-router-dom'
import { setAsset, setAssetReview, setCart } from '../../state/reducers/userReducer'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Slide, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
const Product = () => {
    const user = useSelector(state => state.user.user)
    const asset = useSelector(state => state.user.asset)
    const [isLoading, setLoading] = useState(false)
    const { state } = useLocation()
    useEffect(() => {
        if (state) {
            setLoading(true)
            getAssetById(state._id)
        }
    }, [])
    const getAssetById = async (id) => {
        console.log(id)
        const asset = await axios.post("http://localhost:3001/assets/getAssetById", { assetId: id }, {
            headers: {
                authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        console.log(asset)
        dispatch(setAsset(asset.data))
        setLoading(false)
    }
    // const increaseViews = async () => await axios.post("http://localhost:3001/assets/increaseViews", { assetId: state._id }, {
    //     headers: {
    //         authorization: `Bearer ${Cookies.get('token')}`
    //     }
    // })
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [review, setReview] = useState({ name: "", text: "", rating: 0, website: "", email: "" })
    const cart = user?.cart?.map(items => items.asset._id)
    const [filters, setFilters] = useState([
        { name: 'Size', options: ['Web', 'Small', 'Medium', 'Large'], selected: 'Web' },
        { name: "Currency", options: ['Rupees', 'Dollors', 'Euro'], selected: 'Rupees' },
        { name: "Format", options: ['JPG', 'JPEG', 'PNG'], selected: 'JPG' },
        { name: "Quantity", selected: 1 }
    ])
    const headers = {
        authorization: `Bearer ${Cookies.get('token')}`
    }
    const updateCart = async () => {
        const op = cart?.includes(state._id) ? 0 : 1
        let item = {}
        filters.forEach((filter) => {
            let prop = String(filter.name).toLowerCase()
            let val = String(filter.selected).toLowerCase()
            item[prop] = val
        }
        )
        console.log(item)
        dispatch(setCart({ item: { asset: state, ...item }, op }))
        try {
            await axios.post("http://localhost:3001/users/updateCart", {
                item: { ...item, asset: state._id },
                op
            }, { headers });
            if (op) {
                toast.success("Added to Cart", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                })
            }
        } catch (error) {
            toast(error.response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            })
        }
    }
    const addReview = async () => {
        let item = {}
        Object.keys(review).forEach((filter) => {
            let prop = String(filter).toLowerCase()
            let val = String(review[filter]).toLowerCase()
            item[prop] = val
        })
        dispatch(setAssetReview({ ...item, userId: user?._id }))
        try {
            await axios.post("http://localhost:3001/assets/addReview", {
                item: { ...item, assetId: state._id },
            }, { headers });
        } catch (error) {
            toast(error.response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            })
        }
    }
    const images = [{ path: "./pexels-ata-daftarifard-20440051.jpg", category: 'Nature', icon: 'https://img.icons8.com/material-outlined/24/deciduous-tree.png' }, { path: "./pexels-equalstock-in-20344348.jpg", category: 'Urban', icon: 'https://img.icons8.com/material-outlined/24/hut.png' }, { path: "./pexels-marieke-mol-20518865.jpg", category: "Kids", icon: 'https://img.icons8.com/material-outlined/24/kid.png' }, { path: "./pexels-equalstock-in-20344348.jpg", category: 'Urban', icon: 'https://img.icons8.com/material-outlined/24/hut.png' }, { path: "./pexels-marieke-mol-20518865.jpg", category: "Kids", icon: 'https://img.icons8.com/material-outlined/24/kid.png' }]
    const handleSetFilter = (opt, i) => {
        setFilters(prevFilters => prevFilters.map((filter, index) => {
            if (index === i) {
                return { ...filter, selected: opt };
            }
            return filter;
        }))
    }
    return (
        <div>
            <MainLayout
                component={
                    <div>
                        {isLoading ? <div className='h-[90vh] justify-center flex items-center'>
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span
                                >
                            </div>
                        </div> : <div className='text-gray-200'>
                            <div className=' lg:m-3 rounded-xl'>
                                <div className='p-3'>
                                    <h1 className='font-black text-2xl  lg:text-4xl md:text-center' >
                                        {state.name}
                                    </h1>

                                    <h5 className='font-medium lg:text-md md:text-center text-gray-400'>
                                        By {state.creator.username}
                                    </h5>
                                </div>
                                <div className='flex  gap-4  p-3 shadow rounded-md '>
                                    <div className='lg:col-span-1 basis-1/2  bg-gray-800  flex flex-col rounded-md items-center justify-center flex-1 lg:h-[520px]'>
                                        {
                                            state.type == 'image' ?
                                                <img src={state.assetUrl} alt="" className='shadow-md  rounded-xl object-cover h-full' /> :
                                                <video src={state.assetUrl} controls className='shadow-md rounded-xl max-w-full max-h-full object-cover' />
                                        }

                                    </div>
                                    <div className='lg:col-span-1 basis-1/2 flex-1' >
                                        <div className='flex flex-col gap-4'>
                                            {filters?.map((filter, index) => {
                                                if (filter.name == 'Quantity') {
                                                    return <div className=' flex flex-col gap-2'>
                                                        <h3 className='text-lg font-semibold '>
                                                            Quantity
                                                        </h3>
                                                        <div className='flex gap-5' >
                                                            <div className=' border border-gray-400/45 rounded-md flex' >
                                                                <button disabled={quantity < 2} className='bg-gray-800 text-white rounded-s-md px-4 py-3 ' onClick={() => setQuantity(quant => --quant)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                </button>
                                                                <div>
                                                                    <h4 className='text-xl font-bold  p-[10px] px-5 flex items-center'>
                                                                        {quantity}
                                                                    </h4>
                                                                </div>
                                                                <button onClick={() => setFilters(quant => ++quant)} className='bg-gray-800 text-white rounded-e-md px-4 py-3  p-3'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                else {
                                                    return <div className='flex flex-col gap-2' >
                                                        <h3 className='text-lg font-semibold '>
                                                            {filter.name}
                                                        </h3>
                                                        <div className='flex gap-3 flex-wrap'>
                                                            {
                                                                filter.options.map((opt, i) => <button onClick={() => handleSetFilter(opt, index)} key={i} className={`flex gap-2 px-3 py-2 border border-gray-400/45 rounded-lg ${filter.selected == opt ? 'bg-gray-800 text-white ' : ''}`} >
                                                                    {
                                                                        filter.selected == opt && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                        </svg>
                                                                    }
                                                                    {opt}</button>)
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            }
                                            )}
                                            <div className='flex flex-col gap-1' >
                                                <h3 className='text-lg font-semibold '>
                                                    Price
                                                </h3>
                                                <div className='flex gap-3 font-bold text-2xl'>
                                                    {Object.keys(state.price)[0] == 'EURO' ? `${state.price.EURO} € ` : Object.keys(state.price)[0] == 'USD' ? `${state.price.USD} $ ` : `${state.price.INR} ₹ `}
                                                </div>
                                            </div>
                                            <button className=' rounded-md  w-min text-nowrap  flex gap-2 items-center text-white px-5 sm:px-6 sm:py-4 py-3   font-semibold bg-gray-800 ' onClick={() => updateCart()} >
                                                {cart?.includes(state._id) ? <p className='text-red-400 flex justify-center  gap-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    Remove from cart
                                                </p>
                                                    : <p className='text-white flex justify-center  gap-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        Add to Cart
                                                    </p>
                                                }  </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between border-t border-b  border-gray-400/45 py-2 lg:mx-3 flex-wrap lg:flex-nowrap'>
                                    <div className='lg:px-3 py-3 flex flex-col gap-4 justify-center items-center w-full' >
                                        <div className='rounded-full w-min p-4 flex justify-center items-center bg-gradient-to-tr  from-blue-400 to-red-400 text-gray-200'  >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                            </svg>
                                        </div>
                                        <h3 className='text-lg font-semibold '>
                                            Category
                                        </h3>
                                        <div className='flex gap-3'>
                                            {
                                                state.metaData.categories.map((opt, i) => <div key={i} className='flex gap-2 px-3 py-2 border border-gray-400/45 rounded-lg' >
                                                    {opt}</div>)
                                            }
                                        </div>
                                    </div>
                                    <div className='lg:w-[2px] lg:h-auto  w-full  h-[1px]  bg-gray-500'></div>
                                    <div className='lg:px-3 py-2 flex flex-col gap-2 items-center w-full justify-center' >
                                        <div className='rounded-full w-min p-4 flex justify-center items-center bg-gradient-to-tr  from-blue-400 to-red-400 text-gray-200' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        </div>
                                        <h3 className='text-lg font-semibold '>
                                            Ratings
                                        </h3>
                                        <div className='flex gap-1 items-center' >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" fill="orange" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <p className='text-xl'>
                                                {
                                                    state.review.length ? state.review.reduce((acc, rev) => acc + Number(rev.rating), 0) / state.review.filter(rev => rev.rating > 0).length : 0
                                                }
                                            </p>

                                        </div>
                                    </div>
                                    <div className='lg:w-[2px] lg:h-auto  w-full  h-[1px]  bg-gray-500'></div>
                                    <div className='lg:px-3 py-3 flex flex-col gap-4 justify-center items-center w-full' >
                                        <div className='rounded-full w-min p-4 flex justify-center items-center bg-gradient-to-tr  from-blue-400 to-red-400 text-gray-200'  >
                                            < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke- width="1.5" stroke="currentColor" class="w-6 h-6" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                                            </svg >
                                        </div>
                                        <h3 className='text-lg font-semibold '>
                                            Tags
                                        </h3>
                                        <div className='flex gap-3'>
                                            {
                                                state.metaData.tags.map((opt, i) => <div key={i} className='flex gap-2 px-3 py-2 border border-gray-400/45 rounded-lg' >
                                                    {opt}</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center flex-col gap-6 p-4'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className='text-2xl font-semibold'>
                                            Reviews
                                        </h1>
                                    </div>
                                    <div className='flex gap-4 flex-wrap md:flex-nowrap'>
                                        {state.review.length ?
                                            state.review.map(rev =>
                                                <div className='p-3 bg-gray-800 rounded-lg shadow w-64'>
                                                    <div className='flex gap-2 items-center justify-between'>
                                                        <div className='flex gap-2 items-center'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>

                                                            <h5 className='text-gray-200 text-lg'>{rev.name}</h5>
                                                        </div>
                                                        <div className='flex gap-1'>
                                                            {
                                                                [1, 2, 3, 4, 5].map((count) => {
                                                                    return (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke={rev.rating >= count ? 'orange' : 'currentColor'} fill={rev.rating >= count ? 'orange' : 'none'} className="w-4 h-4">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                                        </svg>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <h6 className='text-gray-400'>{rev.text}</h6>
                                                </div>
                                            ) : <p>
                                                No reviews available
                                            </p>
                                        }


                                        {/* *There are no reviews yet */}
                                    </div>
                                    {/* <hr /> */}
                                    <div className='h-[1px] w-full  bg-gray-400/45' />
                                    <div className='flex flex-col items-center gap-2'>
                                        <h3 className='text-lg font-semibold '>
                                            Give  Ratings
                                        </h3>
                                        <div className='flex gap-2' >
                                            {
                                                [1, 2, 3, 4, 5].map((count) => {
                                                    if (review['rating'] == count) {
                                                        return (<div onClick={() => setReview(prev => ({ ...prev, rating: "" }))} className='rounded-full cursor-pointer  bg-gray-800  border border-gray-400 py-2 px-4 '>
                                                            <p>{count}</p>
                                                        </div>)
                                                    }
                                                    else {
                                                        return (<div onClick={() => setReview(prev => ({ ...prev, rating: count }))} className='rounded-full border cursor-pointer border-white py-2 px-4 '>
                                                            <p>{count}</p>
                                                        </div>)
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <h1 className='text-2xl font-semibold'>
                                            Write your own review
                                        </h1>
                                        <p className='text-sm text-gray-400 text-center'> Required fields are marked *</p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex justify-around gap-4 flex-wrap md:flex-nowrap' >
                                            <div className='w-full'>
                                                <input type="text" onChange={(e) => (setReview(prev => ({ ...prev, name: e.target.value })))} className=' rounded-lg p-3 outline-none bg-gray-800 w-full' placeholder='* Name' />
                                            </div>
                                            <div className='w-full'>
                                                <div className='w-full'>
                                                    <input type="text" onChange={(e) => (setReview(prev => ({ ...prev, email: e.target.value })))} className=' rounded-lg p-3 outline-none bg-gray-800 w-full' placeholder='* Email' />
                                                    <p className='text-xs text-nowrap  text-gray-400 '>Your email address will not be published. </p>
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <input type="text" className=' rounded-lg p-3 outline-none bg-gray-800 w-full' placeholder=' Website' onChange={(e) => (setReview(prev => ({ ...prev, website: e.target.value })))} />
                                            </div>
                                        </div>
                                        <textarea name="" id="" rows='12' className=' rounded-lg p-3  outline-none bg-gray-800' placeholder='* Write your reviews' onChange={(e) => (setReview(prev => ({ ...prev, text: e.target.value })))}  ></textarea>

                                        <button className=' w-full bg-gradient-to-tr  from-blue-400 to-red-400 text-gray-200 p-3 rounded-md shadow ' onClick={() => addReview()}>Save</button>
                                    </div>
                                </div>
                            </div>


                            <h1 className='text-gray-200 text-2xl  xl:text-3xl font-bold text-center my-7'>Recommended For You</h1>

                            <Carousel centerMode autoPlay infiniteLoop showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} centerSlidePercentage={window.innerWidth < 640 ? 85 : window.innerWidth <= 768 ? 70 : window.innerWidth < 1024 ? 60 : window.innerWidth < 1536 ? 30 : 30}>
                                {
                                    images.map(image => {
                                        return (
                                            <div className='sm:m-4 m-2 shadow-md backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 rounded-3xl ' >
                                                <img src={image.path} alt="" className=' rounded-xl rounded-b-3xl  ' />
                                                <div className=''>
                                                    <h2 className='xl:text-2xl text-xl xl:py-3 py-2 font-normal text-center  text-nowrap  gap-2 bg-clip-text text-gray-200'>
                                                        {image.category}
                                                    </h2>
                                                    {/* <h1 className='text-white'>
                                                750
                                            </h1> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>}
                    </div>

                }
            />

        </div>
    )
}

export default Product