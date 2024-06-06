import React, { useState, useEffect, useRef } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAssets } from '../../state/reducers/userReducer';
// import { useNavigation } from 'react-router-dom';
const Upload = ({ setDialog }) => {
    const dispatch = useDispatch()
    const videoInstance = useRef()
    const imageInstance = useRef()
    const [metaData, setMetaData] = useState([{ name: 'name', type: 'textarea', value: '' }, { name: 'tags', type: 'text', value: '' }, { name: 'age', type: 'select', value: '', options: ['Mature Adult', 'Senior Adult', 'Teenager'] }, { name: 'outfit', type: 'select', options: ['Men Casual Wear', 'Saree', 'Women Casual Wear', 'Women Formal Wear', 'Women Gym Wear', 'Women Indian Suit', 'Women Western Wear'] }, { name: 'price', type: 'number' }, , { name: "gesture", value: "", type: "select", options: [] }, { name: 'description', type: 'textarea', value: '' }, { name: 'categories', value: '', type: 'select', options: ['Fashion', 'Technology', 'Education', 'Bussiness', 'Health', 'Shopping', 'Lifestyle : Senior', 'Lifestyle : Children', 'Rural India', 'Lifestyle : Teenagers', 'Food and Drink', 'Concepts & Idea', 'Indian Culture', 'Lifestyle : Families', 'Sports'], showSuggestions: false }, { name: 'people', type: 'select', value: '', options: ['1 person', '2 person', '3 person', '4 person', '5 person', 'More than 5 person'] }, { name: 'location', type: 'select', value: '', showSuggestions: false, options: ['Outdoor', 'Studio Shot'] }, { name: 'currency', type: 'select', value: '', showSuggestions: false, options: ["USD", "EURO", "INR"] }, { name: "advertisement", value: "", type: "select", options: ['Ok', 'Thumbs Up', 'Victory', 'Namaste', 'Silence'] }])
    const [file, setFile] = useState(null);
    const [previewVideo, setPreviewVideo] = useState()
    const [previewImage, setPreviewImage] = useState()
    const [isloading, setLoading] = useState()
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const suggestions = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple', 'Mango', 'Kiwi', 'Strawberry', 'Watermelon'];

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (file.type.split("/")[0] == 'video') {
                    setPreviewImage()
                    setPreviewVideo(e.target.result);
                }
                else {
                    setPreviewVideo()
                    setPreviewImage(e.target.result);
                }
            }
            reader.readAsDataURL(file);
        }
    }, [file])
    const handleUpload = async (file) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        metaData.forEach(dt => {
            formData.append(dt.name, dt.value)
        })
        console.log(metaData)
        try {
            const response = await axios.post('http://localhost:3001/assets/uploadAsset', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${Cookies.get('token')}` },
            });
            console.log('Upload successful:', response.data);
            dispatch(setAssets({ asset: { ...response.data.asset, }, op: 1 }))
            toast.success("Uploaded Successfully", {
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
            const updatedMetaData = metaData.map(item => {
                return { ...item, value: '' };
            });
            setMetaData(updatedMetaData);
            setLoading(false)
            setPreviewImage()
            setPreviewVideo()
            setFile()
            setDialog(false)
        } catch (error) {
            setLoading(false)
            console.error('Upload failed:', error);
        }

    };
    const handleInputChange = (event, show) => {
        const userInput = event.target.value;
        const inputName = event.target.name
        setMetaData(prev => prev.map(item =>
            item.name === inputName ? { ...item, value: userInput } : item
        ))
        setMetaData(prev => prev.map(item =>
            item.name === inputName ? { ...item, showSuggestions: show } : item
        ))

        if (show) {
            if (userInput.length) {
                let ipt = userInput.split(",")
                setFilteredSuggestions(metaData.find(el => el?.name == inputName).options.filter(
                    suggestion => suggestion.toLowerCase().startsWith(ipt[ipt.length - 1].trim().toLowerCase())
                ));
            }
            else {
                setFilteredSuggestions(metaData.find(el => el?.name == inputName).options)
            }
        }
    };

    const handleSuggestionClick = (userInput, inputName, ev) => {
        ev.stopPropagation()
        setMetaData(prev => prev.map(item =>
            item.name === inputName ? { ...item, value: userInput.split(",").length > 0 ? item.value + userInput : userInput, showSuggestions: false } : item
        ))
        console.log("clicked")
    };
    return (
        <div className='w-[80vw] p-4 flex flex-col gap-5'>
            <div className='flex justify-between items-center '>
                <div className='w-11'></div>
                <h3 className='text-4xl text-gray-200 font-extrabold'>Upload</h3>
                <button className='text-gray-200 right-0  p-2  rounded-full bg-gray-800' onClick={() => setDialog(false)}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div class="flex items-center justify-center w-full">
                {!file ? <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-[38vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label> : <div className='w-full bg-gray-700  rounded-lg p-3 h-auto  lg:h-[38vh] justify-center items-center flex gap-2 lg:flex-row flex-col' >
                    <div className='h-full'>
                        {previewVideo && <video src={previewVideo} controls ref={videoInstance} className='h-full rounded-lg'></video>}
                        {previewImage && <img src={previewImage} ref={imageInstance} className='h-full rounded-lg'></img>}
                    </div>
                    <div className='flex flex-row  lg:flex-col  gap-3 items-end justify-end place-self-end'>
                        <button className='text-gray-200 right-0  p-2  rounded-full bg-gray-900' onClick={() => setFile(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={() => { if (previewVideo) { videoInstance.current.requestFullscreen() } else { imageInstance.current.requestFullscreen() } }} className='text-gray-200 right-0  p-2  rounded-full bg-gray-900'  > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        </button>
                    </div>
                </div>
                }
            </div>
            <div className=' w-full  h-[1px]  bg-gray-600'></div>
            <div className='col-span-1  rounded-lg  p-2 flex justify-center flex-col gap-5'>
                <div className='columns-2 space-y-3'>
                    {metaData.map((data, i) => <div key={i} className='break-inside-avoid-column flex flex-col gap-1'>
                        <h5 className='text-gray-300 text-xl font-bold'>
                            {(data.name.slice(0, 1).toUpperCase() + data.name.slice(1))}
                        </h5>
                        {
                            data.type == "textarea" ? <textarea id="" cols="35" rows="6" className='bg-gray-800 text-white rounded-lg ' name={data.name} onChange={(e) => handleInputChange(e, false)}
                            ></textarea> : (data.type == 'text' || data.type == 'number') ? <input type={data.type} name={data.name} autoComplete="off" className='bg-gray-800 rounded-lg p-2 text-white border-none outline-none' onChange={(e) => handleInputChange(e, false)} /> :
                                <div className="relative">
                                    <input
                                        className="w-full p-2 rounded-md border outline-none border-none  text-white  bg-gray-800"
                                        type="text"
                                        name={data.name}
                                        value={data.value}
                                        onFocus={(e) => handleInputChange(e, true)}
                                        onBlur={(e) => handleInputChange(e, false)}
                                        onChange={(e) => handleInputChange(e, true)}
                                    />
                                    {(data.showSuggestions && filteredSuggestions.length) ? (
                                        <ul className="absolute z-10 w-full bg-gray-600 my-1 rounded-md shadow-lg p-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400/35 scrollbar-track-transparent h-auto max-h-28">
                                            {filteredSuggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    className="py-2 px-4 cursor-pointer text-white hover:bg-gray-500 rounded-lg"
                                                    onMouseDown={(ev) => handleSuggestionClick(suggestion, data.name, ev)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    ) : ""}
                                </div>
                        }
                    </div>)}
                </div>
                <div className='flex justify-center '>
                    <button className='bg-gradient-to-tr px-12 py-3  from-blue-400 to-red-400   text-lg lg:text-xl rounded-xl font-semibold text-white ' onClick={() => handleUpload(file)}>{isloading ? <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div> : "Upload File"}</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Upload