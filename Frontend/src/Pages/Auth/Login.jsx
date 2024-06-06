import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUser } from '../../state/reducers/userReducer'
import axios from 'axios';
const Login = () => {
    const nav = useNavigate()
    const email = useRef()
    const password = useRef()
    const [isloading, setLoading] = useState()
    const dispatch = useDispatch()
    const login = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:3001/users/validateUser", {
                email: email.current.value,
                password: password.current.value,
            });
            if (data) {
                dispatch(setUser(data.user))
                Cookies.set("token", data.token)
                nav("/")
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
        setLoading(false)
    }
    return (
        <div>
            <div className=' h-screen relative '>
                <div className='flex justify-center items-center h-full absolute z-50 w-full' >
                    <div className=" p-8 rounded-3xl shadow-lg bg-white  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10  flex justify-center items-center flex-col m-4">
                        <div className="flex justify-center mb-6">
                            <span className="inline-block bg-gradient-to-tr from-blue-400 text-gray-200  to-red-400 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
                            </span>
                        </div>
                        <h2 className="text-2xl text-gray-200  font-bold text-center mb-4">Login</h2>
                        <form onSubmit={login} className='text-white' >
                            <div className="mb-4">
                                <label for="email" className="block text-gray-200 text-sm font-semibold mb-2">Email Address *</label>
                                <input type="email" ref={email} id="email" className="form-input w-full px-4 py-2  rounded-lg  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10 bg-white outline-none " required placeholder="hello@alignui.com" />
                            </div>
                            <div className="mb-6">
                                <label for="password" className="block text-gray-200 text-sm font-semibold mb-2">Password *</label>
                                <input type="password" ref={password} id="password" className="form-input w-full px-4 py-2  rounded-lg  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10 bg-white outline-none " required placeholder="hello@alignui.com" />
                            </div>
                            <button type='submit' className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none bg-gradient-to-tr from-blue-400 mb-5  to-red-400  focus:ring-2 focus:ring-opacity-50">{isloading ? <div
                                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span
                                >
                            </div> : "Login"}</button>
                            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none  backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10  focus:ring-2 focus:ring-opacity-50">Login with Google</button>
                            <div className="mt-4 text-sm text-gray-200 text-center">
                                <p>Don't have an account? <Link to="/register" className="text-white font-bold underline">Regsiter here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <img src="./pexels-matej-614077.jpg" alt="" className=' object-center h-[100vh] w-screen object-cover overflow-hidden' />
                </div>
            </div>
            <ToastContainer />
        </div>
        // </div >
    )
}

export default Login