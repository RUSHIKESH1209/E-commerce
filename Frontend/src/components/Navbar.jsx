import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { getCartCount, setShowSearch, token, setToken, navigate, setCartItems } = useContext(ShopContext)

    const handleLogout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken(null);
        setCartItems({});
    };


    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to={'/'}>
                <img src={assets.logo} className='w-36' />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <Link to={'/collection'}>
                    <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' />
                </Link>
                <div className="group relative">
                    <Link to={'/login'}>  <img src={assets.profile_icon} className='w-5 cursor-pointer' />
                    </Link>
                    {token && <div className='group-hover:block hidden absolute right-0 p-4 pt-4'>
                        <div className="flex flex-col gap-2 w-36 py- px-5 bg-slate-100 text-gray-500 rounded">
                            <p className='cursor-pointer hover:text-black'>My profile</p>
                            <p onClick={() => navigate("/orders")} className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'> {token ? (
                                <p onClick={handleLogout}>Logout</p>
                            ) : (
                                <p onClick={() => navigate("/login")}>Login</p>
                            )}</p>
                        </div>

                    </div>}
                </div>
                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                   
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? `w-full` : `w-0`}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => { setVisible(false) }} className='flex items-center gap-4 p-3'>
                        <img src={assets.dropdown_icon} className='cursor-pointer h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => { setVisible(false) }} to="/" className="py-2 pl-2  border-y border-gray-400">
                        <p className=' text-gray-600'>Home</p>
                    </NavLink>
                    <NavLink onClick={() => { setVisible(false) }} to="/collection" className="py-2 pl-2 border-y border-gray-400">
                        <p className=' text-gray-600'>Collection</p>
                    </NavLink>
                    <NavLink onClick={() => { setVisible(false) }} to="/about" className="py-2 pl-2 border-y border-gray-400">
                        <p className=' text-gray-600'>About</p>
                    </NavLink>
                    <NavLink onClick={() => { setVisible(false) }} to="/contact" className="py-2 pl-2 text border-y border-gray-400">
                        <p className=' text-gray-600'>Contact</p>
                    </NavLink>

                </div>
            </div>

        </div>
    )
}

export default Navbar