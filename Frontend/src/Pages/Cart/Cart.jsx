import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setCart } from '../../state/reducers/userReducer'
import { Slide, toast } from 'react-toastify'

const Cart = () => {
    const cart = useSelector(state => state.user.user?.cart)
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState(0)
    const [isloading, setLoading] = useState(true)

    const headers = {
        authorization: `Bearer ${Cookies.get('token')}`
    }
    const getAsset = async (path) => {
        try {
            const response = await axios.post('http://localhost:3001/assets/getAsset', { Path: path }, {
                headers,
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            return url
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
    const updateCart = async (item) => {
        dispatch(setCart({ item, op: 0 }))
        delete item._id
        delete item.assetUrl
        try {
            await axios.post("http://localhost:3001/users/updateCart", {
                item: { ...item, asset: item.asset._id },
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
        if (cart) {
            getCart()
        }
    }, [cart])
    const getCart = async () => {
        const updatedItems = [];
        console.log(cart)
        for (const item of cart) {
            if (!item.assetUrl) {
                const assetUrl = await getAsset(item.asset.path?.demo);
                const updatedItem = { ...item, assetUrl };
                updatedItems.push(updatedItem);
            } else {
                updatedItems.push(item);
            }
        }
        setCartItems(updatedItems)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }
    const getOriginalAsset = async () => {
        const assets = cartItems?.map(item => item.asset._id)
        try {
            const response = await axios.post("http://localhost:3001/assets/getOriginalAsset", { assets }, { headers, responseType: 'blob' },
            );
            const blob = new Blob([response.data], { type: 'application/zip' }); // Create a Blob from the binary data
            const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
            console.log(url)
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'files.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading files:', error);
        }
    }
    return (
        <div>
            <MainLayout component={
                <div className='realtive'>
                    <div className=' gap-20 mt-4 mb-12 m-2'>
                        <div className='flex flex-col gap-3'>
                            <div className='text-2xl md:text-4xl font-black text-white bg-gray text-center' >
                                My  Cart
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
                            </div> : cartItems.length == 0 ? <div className='h-[80vh] flex flex-col gap-4 justify-center items-center'>
                                <h1 className='font-extrabold text-4xl text-gray-200 '>
                                    Your cart is empty
                                </h1>
                                <button className='text-white px-7 py-3   w-min  rounded-lg text-lg  p-5 text-nowrap font-bold bg-gradient-to-tr from-blue-400   to-red-400'>
                                    Explore Now
                                </button>
                            </div> :
                                <div className='grid lg:grid-cols-4 gap-3 min-h-[90vh]' >
                                    <div className=' gap-3  lg:col-span-3 md:columns-2 columns-1  lg:columns-3 space-y-3 '>
                                        {cartItems?.map((item, i) => {
                                            return (
                                                <div key={i} className='flex relative  lg:gap-   rounded-lg p-1 bg-gray-800 flex-col break-inside-avoid-column transition-opacity duration-1000 ease-out'   >
                                                    {
                                                        item.asset.type == 'image' ?
                                                            <img src={item.assetUrl} alt="" className='rounded-lg ' /> : <video src={item.assetUrl} controls className='rounded-lg ' ></video>
                                                    }
                                                    <div className='absolute text-gray-200 right-0  p-2 my-2 mx-3 rounded-full bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 cursor-pointer' onClick={() => updateCart(item)}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                    </div>
                                                    <div className='p-1 flex-col flex gap-2'>
                                                        <h3 className='text-white font-bold text-lg  lg:text-xl'>
                                                            {item.asset.name}
                                                        </h3>
                                                        <div className='flex gap-3 items-center'>
                                                            <h4 className='font-bold text-white text-2xl'>
                                                                {Object.keys(item.asset.price)[0] == 'EURO' ? `${item.asset.price.EURO} € ` : Object.keys(item.asset.price)[0] == 'USD' ? `${item.asset.price.USD} $ ` : `${item.asset.price.INR} ₹ `}
                                                            </h4>
                                                            <h5 className='font-bold text-red-500 text-md ' >
                                                                39% OFF
                                                            </h5>
                                                            <h5 className='font-bold text-green-500 text-md' >
                                                                2 offers applied
                                                            </h5>
                                                        </div>
                                                        <div className='flex  gap-1 justify-between  lg:gap-2 p-1'>
                                                            <div className='flex gap-2'>
                                                                <h4 className=' text-gray-300'>
                                                                    Size
                                                                    :
                                                                </h4>
                                                                <h4 className='font-bold text-gray-100'>
                                                                    {item.size}
                                                                </h4>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <h4 className=' text-gray-300'>
                                                                    Format
                                                                    :
                                                                </h4>
                                                                <h4 className='font-bold text-gray-100'>
                                                                    {item.format}
                                                                </h4>
                                                            </div>
                                                            <div className='flex gap-2 items-center' >
                                                                <h4 className=' text-gray-300'>
                                                                    Quantity
                                                                    :
                                                                </h4>
                                                                <div className=' rounded-md flex' >
                                                                    <div>
                                                                        <h4 className='text-xl text-white  font-bold  flex items-center'>
                                                                            {item.quantity}
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className=' bg-gray-800  lg:rounded-xl rounded-t-3xl  p-3  flex lg:gap-4 gap-2  flex-col lg:relative fixed w-full left-0  bottom-0 z-50'>
                                            <h6 className='text-white font-bold text-2xl mb-2 hidden lg:block' > Payment Details</h6>
                                            <div className='flex justify-between'>
                                                <h6 className='text-white font-semibold text-lg' >Subtotal (6 Items)   </h6>
                                                <h6 className='text-white font-semibold text-lg' >₹1000  </h6>
                                            </div>
                                            <div className='w-full h-[1px] bg-gray-500'></div>
                                            <div className='flex justify-between'>
                                                <h6 className='text-white font-semibold text-lg' >GST ( 18% )  </h6>
                                                <h6 className='text-white font-semibold text-lg' >₹1000  </h6>
                                            </div>
                                            <div className='w-full h-[0.5px] bg-gray-500'></div>

                                            <div className='flex justify-between'>
                                                <h6 className=' text-white font-semibold text-lg' > Total  </h6>
                                                <h6 className='text-white font-semibold text-lg' >₹1000  </h6>
                                            </div>
                                            {/* <hr className='width-full' /> */}
                                            <div className='flex gap-2' >
                                                <button className=' block lg:hidden  bg-gradient-to-tr  from-blue-400 to-red-400 w-full lg:p-3 p-2  text-lg lg:text-xl rounded-xl font-bold text-white' > Add Coupon </button>
                                                <button className='bg-gradient-to-tr  from-blue-400 to-red-400 w-full lg:p-3 p-2  text-lg lg:text-xl rounded-xl font-bold text-white' onClick={() => getOriginalAsset()} > Pay Now  </button>
                                            </div>
                                        </div>
                                        <div className='bg-gray-800  rounded-xl p-3  gap-5 flex-col hidden lg:flex'>
                                            <h6 className='text-white font-bold text-2xl' > Coupon Discount </h6>
                                            <input type="email" id="email" className="form-input w-full px-4 py-2  rounded-lg  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10 bg-white outline-none " required placeholder="Enter Coupon Code" />
                                            <button type="submit" className="w-full bg-gray-200 font-bold  text-white px-4 py-2 rounded-lg focus:outline-none  backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10  focus:ring-2 focus:ring-opacity-50">Apply Coupon</button>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>} />
        </div >
    )
}

export default Cart