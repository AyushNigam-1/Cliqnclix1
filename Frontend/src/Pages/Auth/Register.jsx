import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { setUser } from '../../state/reducers/userReducer';
const Register = () => {
    const user = useSelector(state => state.user)
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const [isloading, setLoading] = useState()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const register = async (event) => {
        event.preventDefault()
        if (confirmPassword.current.value == password.current.value) {
            setLoading(true)
            try {
                const { data } = await axios.post("http://localhost:3001/users/createUser", {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                });
                if (data) {
                    console.log(data.user)
                    dispatch(setUser(data.user))
                    Cookies.set("token", data.user.token)
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
        }
        else {
            document.getElementById("confirmPassword").setCustomValidity("Confirm password is not same as password")
        }
        setLoading(false)
    }
    return (
        <div className=''>
            <div className="flex items-center justify-center h-screen relative">
                <div className='flex justify-center items-center h-full absolute z-50 w-full' >
                    <div className=" p-8 rounded-3xl shadow-lg bg-gray-200  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10  flex justify-center items-center flex-col m-4 ">
                        <div className="flex justify-center mb-4">
                            <span className="inline-block bg-gradient-to-tr from-blue-400 text-gray-200  to-red-400 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
                            </span>
                        </div>
                        <h2 className="text-2xl text-gray-200  font-bold text-center mb-5">Register</h2>
                        <form onSubmit={register}>
                            <div className='md:columns-2 columns-1  space-y-4  flex-wrap text-white' >
                                <div className="">
                                    <label for="email" className="block text-gray-200 text-sm font-semibold mb-2 "> Name *</label>
                                    <input type="text" ref={username} id="username" className="form-input w-full px-4 py-2  rounded-lg  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10 bg-white outline-none " required placeholder="hello@alignui.com" />
                                </div>

                                <div className="">
                                    <label for="password" className="block text-gray-200 text-sm font-semibold mb-2">Email *</label>
                                    <input type="email" ref={email} id="email" className="form-input w-full px-4 py-2 border rounded-lg bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md bg-white  bg-opacity-10 bg-transparent outline-none border-none" required placeholder="••••••••" />

                                </div>
                                <div className="">
                                    <label for="password" className="block text-gray-200 text-sm font-semibold mb-2">Password *</label>
                                    <input type="password" id="password" ref={password} className="form-input w-full px-4 py-2 border rounded-lg bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md bg-white  bg-opacity-10 bg-transparent outline-none border-none" required placeholder="••••••••" />

                                </div>
                                <div className="">
                                    <label for="confirmPassword" className="block text-gray-200 text-sm font-semibold mb-2">Confirm Password *</label>
                                    <input type="password" id="confirmPassword" ref={confirmPassword} className="form-input w-full px-4 py-2 border rounded-lg bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md bg-white   bg-opacity-10 bg-transparent outline-none border-none" required placeholder="••••••••" />

                                </div>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <button type="submit" className="w-full bg-blue-500 text-white mt-4  px-4 py-2 rounded-lg focus:outline-none bg-gradient-to-tr from-blue-400   to-red-400  focus:ring-2 focus:ring-opacity-50 font-bold">{isloading ? <div
                                    className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span
                                    >
                                </div> : "Register"}</button>
                                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none  backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10  focus:ring-2 focus:ring-opacity-50 font-bold">Login with Google</button>
                                <div className="mt-4 text-sm text-gray-200 text-center">
                                    <p>Already have an account? <Link to="/login" className="text-white font-bold underline">Login here</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <img src="./pexels-matej-614077.jpg" alt="" className='object-center h-[100vh] w-screen object-cover overflow-hidden' />
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Register