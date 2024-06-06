import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import Upload from '../Upload/Upload'
import LineChart from '../../components/Layout/LineChart'
const Contributor = () => {
    const [stats, setStats] = useState({
        downloads: 0, income: 0, views: 0
    })
    const user = useSelector(state => state.user.user)
    const userAssets = useSelector(state => state.user.user?.assets)
    const [assets, setAssets] = useState([])
    const [currentAssets, setCurrentAssets] = useState([])
    const [isloading, setLoading] = useState(true)
    const [openDialog, setDialog] = useState(false)
    const [type, setType] = useState('Date')
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        if (userAssets && assets?.length == 0) {
            setStats({ views: user.assets.map(asset => asset.views.length).reduce((acc, view) => acc + view, 0), downloads: user.assets.map(asset => asset.downloads.length).reduce((acc, view) => acc + view, 0), income: 0 })
            getAllAssets()
        }
    }, [userAssets])
    const getAllAssets = async () => {
        setLoading(true)
        const updatedItems = []
        for (const item of user?.assets) {
            if (!item.assetUrl) {
                const assetUrl = await getAsset(item.path?.demo);
                const updatedItem = { ...item, assetUrl };
                updatedItems.push(updatedItem);
            } else {
                updatedItems.push(item);
            }
        }
        setAssets(updatedItems)
        for (let index = 0; index < 10; index++) {
            setCurrentAssets(updatedItems[index])
        }
        setLoading(false)
        console.log(calculateViewsPerDay(updatedItems))
    }
    const calculateViewsPerDay = assets => {
        const viewsPerDay = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        assets?.forEach(asset => {
            asset.views?.forEach(view => {
                const date = new Date(view.viewedAt);
                const dateString = `${date.getDate()} ${months[date.getMonth()]}`;
                if (viewsPerDay[dateString]) {
                    viewsPerDay[dateString]++;
                } else {
                    viewsPerDay[dateString] = 1;
                }
            });
        });
        const data = Object.entries(viewsPerDay).map(([date, count]) => ({
            x: date,
            y: count
        }));
        return data;
    };

    const sortAssets = async (prop) => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/assets/sortAssets', { sortBy: prop }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('token')}`,
                },
            });
            const updatedItems = [];
            for (const item of response.data.assets) {
                if (!item.assetUrl) {
                    const assetUrl = await getAsset(item.path?.demo);
                    const updatedItem = { ...item, assetUrl };
                    updatedItems.push(updatedItem);
                } else {
                    updatedItems.push(item);
                }
            }
            setAssets(updatedItems)
        } catch (error) {
            console.error('Upload failed:', error);
        }
        setLoading(false)
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
    const data = [
        { x: 0, y: 20 },
        { x: 1, y: 40 },
        { x: 2, y: 10 },
        { x: 3, y: 60 },
        { x: 4, y: 30 },
    ];
    return (
        <MainLayout component={
            <div className='p-4 flex flex-col gap-5 relative' >
                {
                    <div className={`fixed z-50 max-h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400/35 scrollbar-track-transparent overflow-x-hidden translate-x-1/2 right-1/2 bg-gray-700 rounded-xl shadow-md transition-opacity duration-300 ${openDialog ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <Upload setDialog={setDialog} />
                    </div>
                }
                {
                    isloading ? <div className='h-[90vh] justify-center flex items-center'>
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >
                        </div>
                    </div> : assets?.length == 0 ? <div className='h-[80vh] flex flex-col gap-4 justify-center items-center'>
                        <h1 className='font-extrabold text-4xl text-gray-400 '>
                            You didnt upload anything yet !
                        </h1>
                        <button onClick={() => setDialog(true)} className='flex gap-1 items-center bg-gradient-to-tr  from-blue-400 to-red-400 px-4 py-2  text-lg  rounded-xl  text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Upload Now</button>
                    </div> :
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3 justify-center'>
                                {/* {
                                    assets.length &&
                                    <LineChart data={data} viewsPerDay={calculateViewsPerDay(assets)} width={500} height={305} padding={70} title={"Views"} />

                                } */}
                                <div className='flex flex-col gap-4 '>
                                    <div className=' p-4 flex gap-2 flex-col items-center bg-gray-800 rounded-md'>
                                        <img src="./pexels-adrian-rivero-20513314.jpg" alt="" className='rounded-full h-32 w-32' />
                                        <h3 className='text-white text-lg'>
                                            {user?.username}
                                        </h3>
                                    </div>
                                    <div className=' rounded-lg  flex flex-col  gap-3 bg-gray-800 p-4'>
                                        <h4 className='font-bold text-white text-2xl flex gap-2 items-center' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                        </svg>
                                            This Week</h4>
                                        <div className='flex gap-4'>
                                            {
                                                Object.keys(stats).map(stat =>
                                                    <div className='bg-gray-700 text-white p-2 rounded-md w-32 flex  flex-col'>
                                                        <h1 className='text-lg font-semibold text-gray-300'> {(stat.slice(0, 1).toUpperCase() + stat.slice(1))}
                                                        </h1>
                                                        <div className='flex items-center gap-2'>
                                                            {
                                                                stat == 'views' ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                    </svg> : stat == 'downloads' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>


                                                            }
                                                            <h4 className='text-white font-bold text-xl'>{stats[stat]}</h4>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[1px] bg-gray-700 w-full '></div>
                            <div className='flex justify-between'>
                                <div className='relative'>
                                    {
                                        !assets?.length == 0 ? <button className='bg-gray-800 py-2 px-4 rounded-lg flex gap-2 items-center' onClick={() => setOpen(!isOpen)} >
                                            <p className='text-lg   text-white' >
                                                {(type.slice(0, 1).toUpperCase() + type.slice(1))}
                                            </p>
                                            {!isOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                            }
                                        </button> : ""
                                    }
                                    {isOpen && (
                                        <div className="absolute bg-gray-800 py-2  shadow-lg rounded-lg mt-2 text-white right-0 z-50" >
                                            <button className="block px-4 py-2  z-50 " onClick={() => { setType("Date"); setOpen(!isOpen); sortAssets("Date") }}  >Date</button>
                                            <button className="block px-4 py-2 text-nowrap  z-50 " onClick={() => { setType("Views"); setOpen(!isOpen); sortAssets("views") }}> Views</button>
                                            <button className="block px-4 py-2  text-nowrap  z-50" onClick={() => { setType("Downloads"); setOpen(!isOpen); sortAssets("downloads") }}> Downloads</button>

                                        </div>
                                    )}
                                </div>
                                <h4 className='text-4xl text-white font-bold'>Gallery</h4>
                                <div>
                                    {
                                        !assets?.length == 0 ?
                                            <button onClick={() => setDialog(true)} className='flex gap-1 items-center bg-gradient-to-tr  from-blue-400 to-red-400 px-4 py-2 text-lg  rounded-xl  text-white'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                                Upload</button> : ""
                                    }
                                </div>
                            </div>
                            <div className='columns-4 space-x-3 space-y-3'>
                                {assets?.map((item, i) => <div key={i}>
                                    <div className="p-1 flex relative  flex-col bg-gray-800 shadow-md rounded-lg break-inside-avoid-column " >
                                        {
                                            item.type == 'image' ?
                                                <img src={item.assetUrl} alt="" className='rounded-lg' /> : <video src={item.assetUrl} controls className='rounded-lg ' ></video>
                                        }
                                        <div className=' p-2  font-bold'>
                                            <div className='flex flex-col gap-1'>
                                                <h1 className='text-gray-200 text-lg'>
                                                    {item?.name}
                                                </h1>
                                                <div className='flex justify-between' >
                                                    <div className='flex gap-3 items-center '>
                                                        <h4 className='font-bold text-white text-xl'>
                                                            {Object.keys(item.price)[0] == 'EURO' ? `${item.price.EURO} € ` : Object.keys(item.price)[0] == 'USD' ? `${item.price.USD} $ ` : `${item.price.INR} ₹ `}
                                                        </h4>
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
                                                <div className='flex  gap-1 justify-between  lg:gap-2 '>
                                                    <div className='flex gap-2'>
                                                        <h4 className=' text-gray-300'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                        </h4>
                                                        <h4 className='font-bold text-gray-100'>
                                                            {item.views.length}
                                                        </h4>
                                                        <h4 className=' text-gray-300'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                            </svg>
                                                        </h4>
                                                        <h4 className='font-bold text-gray-100'>
                                                            {item.downloads.length}
                                                        </h4>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <button className='relative bg-gray-900 text-gray-200 p-2  rounded-full '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                            </svg>

                                                        </button>
                                                        <button className='relative bg-gray-900 text-gray-200 p-2  rounded-full '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                }
            </div>}
        />
    )
}

export default Contributor