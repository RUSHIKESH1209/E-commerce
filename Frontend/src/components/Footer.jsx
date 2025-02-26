import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_3fr] text-sm gap-14 my-10 mt-40 '>
                <div>
                    <img className='mb-5 w-32' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Forever is a premium clothing brand offering high-quality, stylish apparel for all genders. We focus on timeless fashion, comfort, and durability to keep you looking your best.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91-123-456-7890</li>
                        <li>forever@gmail.com</li>
                    </ul>
                </div>



            </div>
            <div >
                <hr />
                <p className='py-5 text-sm text-center'>
                    copyright 2024@forever.com -All Rights Reserved
                </p>
            </div>
        </div>
    )
}

export default Footer