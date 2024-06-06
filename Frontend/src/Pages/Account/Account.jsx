import React from 'react'
import MainLayout from '../../components/Layout/MainLayout'

const Account = () => {

    const details = [{ name: 'General Details', fields: [{ name: "First Name", value: '' }, { name: 'Last Name', value: '' }, { name: 'Display Name', value: "" }, { name: "Email Address", value: "" }] }, { name: "Password ", fields: [{ name: 'Current Password', value: "" }, { name: "New Password", value: "" }, { name: "Confirm New Password", value: "" }] }, { name: "Billing Address", fields: [{ name: 'First Name', value: '' }, { name: "Last Name", value: "" }, { name: "Company Name", value: "" }, { name: "Country Name", value: "" }, { name: "Street Address", value: "" }, { name: "Town City", value: "" }, { name: "State", value: "" }, { name: "PIN Code", value: "" }, { name: "Phone", value: "" }, { name: "Email Address", value: "" }] }]
    return (
        <MainLayout component={<div className='flex flex-col gap-5 pt-4 ' >
            <h1 className='text-2xl md:text-4xl font-black text-white bg-gray text-center ' >
                My Account
            </h1>
            <div className=' m-4 rounded-xl flex flex-col p-4 gap-5  backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10'>
                {details.map((detail, count) => <div className='flex flex-col gap-5 backdrop-filter backdrop-brightness-75 backdrop-blur-sm  bg-opacity-10 rounded-xl items-center'>
                    <h2 className="text-2xl text-white  font-bold ">{detail.name}</h2>
                    <div className='flex flex-wrap gap-10 justify-center'>
                        {detail.fields.map((field, i) =>
                            <div className='' key={i}    >
                                <label for="email" className="block text-center  text-gray-200 text-sm font-semibold mb-2">{field.name}*</label>
                                <input type="email" id="email" className="form-input w-full px-4 py-2  rounded-lg  bg-clip-padding backdrop-filter backdrop-brightness-75 backdrop-blur-md  bg-opacity-10 bg-white outline-none " required placeholder="" />
                            </div>
                        )}
                    </div>

                    <div className='h-[1px] w-full bg-gray-600 '>
                    </div>

                </div>)}
                <button className='bg-gradient-to-tr   from-blue-400 to-red-400 w-min text-nowrap  px-6 py-2 m-auto  text-md lg:text-lg rounded-xl  text-white' > Save Changes  </button>
            </div>

        </div>}>
        </MainLayout>
    )
}

export default Account