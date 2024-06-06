import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import Pagination from '../../components/Layout/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { Slide, ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import axios from 'axios'
import { setWishlist } from '../../state/reducers/userReducer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Category = () => {
    const nav = useNavigate()
    const { category } = useParams()
    const [activeFilters, setActiveFilters] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [filters, setFilters] = useState([{
        name: 'Age', types: ['Mature Adult'], selected: []
    }, { name: 'Person', types: ['1 person', '2 person', '3 person', '4 person', '5 person'], selected: [] }, { name: 'People', types: ['1 Person Only'], selected: [] }, { name: 'Location', types: ['Outdoor', 'Studio Shot'], selected: [] }, { name: 'Outfits', types: ['Saree', 'Traditional', 'Women Casual Wear', 'Women Gym Wear', 'Women Indian Suit'], selected: [] }])
    const [assets, setAssest] = useState()
    const [type, setType] = useState('image')
    const [isOpen, setOpen] = useState(false)
    const [isloading, setLoading] = useState(false)
    const wishlist = useSelector(state => state.user.user?.wishlist)?.map(item => item._id)
    const dispatch = useDispatch()
    const headers = {
        authorization: `Bearer ${Cookies.get('token')}`
    }
    const updateWishlist = async (item, ev) => {
        ev.stopPropagation()
        const op = wishlist?.includes(item._id) ? 0 : 1
        dispatch(setWishlist({ item, op }))
        try {
            await axios.post("http://localhost:3001/users/updateWishlist", {
                itemId: item._id,
                userId: Cookies.get("token"),
                op
            }, { headers });
            if (op) {
                toast.success("Added to Wishlist", {
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
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`,
                },
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            return url
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
    useEffect(() => {
        getAssetsByCategory()
    }, [type, page])
    const getAssetsByCategory = async (allfilters) => {
        setLoading(true)
        setAssest()
        const { data } = await axios.post("http://localhost:3001/assets/getAssetsByCategory", {
            type,
            page,
            filters: allfilters ?? activeFilters,
            category,
        }, { headers });
        for (const dt of data.assets) {
            dt.assetUrl = await getAsset(dt.path.demo)
        }
        setAssest(data.assets)
        setTotalPage(Math.round(data.totalEntries / 10) + 1)
        setLoading(false)
    }
    const applyFilter = (name, value) => {
        const updatedFilters = filters.map(filter => {
            if (filter.name === name) {
                const selected = filter.selected.includes(value)
                    ? filter.selected.filter(item => item !== value)
                    : [...filter.selected, value];
                return { ...filter, selected };
            }
            return filter;
        });
        setFilters(updatedFilters);
        const allFilters = updatedFilters.map(filter => ({ [filter.name.toLowerCase()]: filter.selected.map(opt => opt.toLowerCase()) }));
        setActiveFilters(allFilters)
        getAssetsByCategory(allFilters);
    }

    return (
        <div>
            <MainLayout component={
                <div className='min-h-[90vh] '>
                    <div className='grid lg:grid-cols-12 gap-20 mt-4 mb-12 m-4'>
                        <div className='lg:col-span-2 hidden lg:block'>
                            <div className='sticky overflow-y-scroll h-[98vh] top-2 w-60 bg-gray-800 rounded-md shadow-md p-4 scrollbar-thin scrollbar-thumb-gray-400/35 scrollbar-track-transparent' >
                                <div className='text-white flex flex-col gap-3'>
                                    {
                                        filters.map(filter =>
                                            <div>
                                                <h1 className='font-bold text-xl text-center mb-2' >{filter.name}</h1>
                                                {
                                                    filter.types.map((type, i) => <> < button key={i} onClick={() => applyFilter(filter.name, type, i)} className='my-2 font-medium p-2  transition-colors delay-100 w-full  text-white/80 rounded-lg cursor-pointer  gap-1'>
                                                        {filter.selected.includes(type) ? <div className='flex  items-center gap-1 text-green-400 justify-center'>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg> {type}</div> : type}
                                                    </button></>)
                                                }
                                                <hr className='mt-4 text-gray-200' />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-10 flex flex-col gap-3'>
                            <div className='flex justify-center flex-col md:flex-row gap-4  md:justify-between items-center text-white ' >
                                <div className='text-2xl md:text-4xl font-black text-white bg-gray text-center' >
                                    {(category.slice(0, 1).toUpperCase() + category.slice(1))}
                                </div>
                                <div className='relative'>
                                    <button className='bg-gray-800 py-2 px-6 rounded-lg flex gap-2 items-center' onClick={() => setOpen(!isOpen)} >
                                        <p className='text-lg   text-white' >
                                            {(type.slice(0, 1).toUpperCase() + type.slice(1))}
                                        </p>

                                        {!isOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                        }
                                    </button>
                                    {isOpen && (
                                        <div className="absolute bg-gray-800 py-2 w-32 shadow-lg rounded-lg mt-2 z-50" >
                                            <button className="block px-4 py-2  z-50 " onClick={() => { setType("image"); setOpen(!isOpen) }}  >Image</button>
                                            <button className="block px-4 py-2  z-50 " onClick={() => { setType("video"); setOpen(!isOpen) }}>Video</button>
                                            <button className="block px-4 py-2  z-50" onClick={() => { setType("vector"); setOpen(!isOpen) }}>Vector</button>

                                        </div>
                                    )}
                                </div>
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
                            </div> : <div>
                                {
                                    assets?.length ? <div className='lg:columns-4 md:columns-2 columns-1  space-y-4 '>
                                        {assets?.map(asset => <div>
                                            <div className="p-1 flex flex-col relative  bg-gray-800  shadow-md rounded-lg break-inside-avoid-column w-100 cursor-pointer " onClick={() => nav("/product", { state: asset })}  >
                                                {
                                                    type == 'image' ? <img src={asset.assetUrl} alt="" className='rounded-lg' /> :
                                                        <video src={asset.assetUrl} controls className='rounded-lg' />
                                                }
                                                <button className='absolute text-gray-200 right-0  p-3 my-2 mx-3 rounded-full bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10' onClick={(ev) => updateWishlist(asset, ev)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill={!wishlist?.includes(asset._id) ? 'none' : 'red'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={!wishlist?.includes(asset._id) ? 'currentColor' : ''} className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    </svg>
                                                </button>
                                                <div className=' font-bold p-2'>
                                                    <div className='flex flex-col gap-1'>
                                                        <h1 className='text-gray-200 text-lg'>
                                                            {asset.name}
                                                        </h1>
                                                        <div className='flex justify-between' >

                                                            <div className='flex gap-3 items-center '>
                                                                <h4 className='font-bold text-white text-xl'>
                                                                    {Object.keys(asset.price)[0] == 'EURO' ? `${asset.price.EURO} € ` : Object.keys(asset.price)[0] == 'USD' ? `${asset.price.USD} $ ` : `${asset.price.INR} ₹ `}
                                                                </h4>
                                                                <h5 className='font-bold text-green-500 text-sm ' >
                                                                    39% OFF
                                                                </h5>
                                                            </div>
                                                            <div className='flex gap-1 items-center' >
                                                                <h6 className='text-white text-xl' > {
                                                                    asset.review.length ?
                                                                        asset.review.reduce((acc, rev) => acc + Number(rev.rating), 0) / asset.review.filter(rev => rev.rating > 0).length : 0
                                                                }</h6>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}

                                    </div> : <div className='h-[75vh] flex flex-col gap-4 justify-center items-center'>
                                        <h1 className='font-medium text-3xl text-gray-200 '>
                                            No  {(type.slice(0, 1).toUpperCase() + type.slice(1))}s available !
                                        </h1>
                                    </div>
                                }
                            </div>}
                            {
                                Boolean(assets?.length) && <div className='mt-auto'>
                                    <Pagination setPage={setPage} totalPage={totalPage} page={page} />
                                </div>
                            }
                        </div>
                    </div>
                </div>} />
            <ToastContainer />
        </div >
    )
}

export default Category