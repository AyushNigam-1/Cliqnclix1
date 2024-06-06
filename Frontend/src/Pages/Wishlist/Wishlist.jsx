import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import Pagination from '../../components/Layout/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setCart, setWishlist } from '../../state/reducers/userReducer'
import { Slide, ToastContainer, toast } from 'react-toastify'

const Wishlist = () => {
    const wishlist = useSelector(state => state.user.user?.wishlist)
    const cart = useSelector(state => state.user.user?.cart)?.map(items => items.asset._id)
    const dispatch = useDispatch()
    const [wishlistItems, setwishlistItems] = useState([])
    const [isloading, setLoading] = useState(true)
    const headers = {
        authorization: `Bearer ${Cookies.get('token')}`
    }
    const updateCart = async (item) => {
        const op = cart?.includes(item?._id) ? 0 : 1
        dispatch(setCart({ item: { asset: item, size: "Web", format: 'JPG', currency: "INR", quantity: 1 }, op }))
        try {
            await axios.post("http://localhost:3001/users/updateCart", {
                item: { size: "Web", formaz: 'JPG', currency: "INR", quantity: 1, asset: item?._id },
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
    const getAsset = async (path) => {
        try {
            const response = await axios.post('http://localhost:3001/assets/getAsset', { Path: path }, {
                headers,
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            return Promise.resolve(url)
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
    const updateWishlist = async (item) => {
        dispatch(setWishlist({ item, op: 0 }))
        try {
            await axios.post("http://localhost:3001/users/updateWishlist", {
                itemId: item._id,
                userId: Cookies.get("token"),
                op: 0
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
    useEffect(() => {
        if (wishlist) {
            getWishlist()
        }
    }, [wishlist])
    const getWishlist = async () => {
        const updatedItems = [];
        for (const item of wishlist) {
            if (!item.assetUrl) {
                const assetUrl = await getAsset(item.path?.demo);
                const updatedItem = { ...item, assetUrl };
                updatedItems.push(updatedItem);
            } else {
                updatedItems.push(item);
            }
        }
        setwishlistItems(updatedItems)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }
    return (
        <div>
            <MainLayout component={
                <div className='lg:col-span-10 flex flex-col gap-4 m-4 '>
                    <div className='text-2xl md:text-4xl font-black text-white bg-gray text-center ' >
                        My Wishlist
                    </div>
                    {isloading ? <div className='h-[80vh] justify-center flex items-center'>
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >
                        </div>
                    </div> : wishlistItems.length == 0 ? <div className='h-[80vh] flex flex-col gap-4 justify-center items-center'>
                        <h1 className='font-extrabold text-4xl text-gray-200 '>
                            Your wishlist is empty
                        </h1>
                        <button className='text-white px-7 py-3  w-min  rounded-lg text-lg  p-5 text-nowrap font-bold bg-gradient-to-tr from-blue-400   to-red-400'>
                            Explore Now
                        </button>
                    </div> :
                        <div className='lg:columns-5 md:columns-2 columns-1  space-y-4 min-h-[90vh]'>
                            {wishlistItems?.map((item, i) => <div key={i}>
                                <div className="p-1 flex relative  flex-col bg-gray-800 shadow-md rounded-lg break-inside-avoid-column w-100 " >
                                    {
                                        item.type == 'image' ?
                                            <img src={item.assetUrl} alt="" className='rounded-lg' /> : <video src={item.assetUrl} controls className='rounded-lg ' ></video>
                                    }
                                    <button className='absolute text-gray-200 right-0  p-2 my-2 mx-3 rounded-full bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10' onClick={(ev) => updateWishlist(item)}  > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                    <div className=' p-2  font-bold'>
                                        <div className='flex flex-col gap-1'>
                                            <h1 className='text-gray-200 text-lg'>
                                                {item.name}
                                            </h1>
                                            <div className='flex justify-between' >

                                                <div className='flex gap-3 items-center '>
                                                    <h4 className='font-bold text-white text-xl'>
                                                        {Object.keys(item.price)[0] == 'EURO' ? `${item.price.EURO} € ` : Object.keys(item.price)[0] == 'USD' ? `${item.price.USD} $ ` : `${item.price.INR} ₹ `}
                                                    </h4>
                                                    <h5 className='font-bold text-green-500 text-sm ' >
                                                        39% OFF
                                                    </h5>
                                                </div>
                                                <div className='flex gap-1 items-center' >
                                                    <h6 className='text-white text-xl' >
                                                        {item.review.length ?
                                                            item.review.reduce((acc, rev) => acc + Number(rev.rating), 0) / item.review.filter(rev => rev.rating > 0).length : 0
                                                        }
                                                    </h6>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button type="submit" onClick={() => updateCart(item)} className="w-full bg-gray-900 font-bold  text-white px-4 py-2 rounded-lg focus:outline-none   ">{cart?.includes(item?._id) ?
                                                <p className='text-red-400 flex justify-center  gap-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    Remove from cart
                                                </p> :
                                                <p className='text-white flex justify-center  gap-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    Add to Cart
                                                </p>
                                            }  </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    }
                    <div className='mt-auto'>
                        <Pagination />
                    </div>
                </div>} />
            <ToastContainer />
        </div>
    )
}

export default Wishlist
