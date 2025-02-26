import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const {
    products,
    currency,
    deliveryCharge,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    setToken,
    token
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()


    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[items][size]
              orderItems.push(itemInfo)

            }
          }
        }
      }
      // console.log('orderitems', orderItems)
      // console.log('cartitems', cartItems)
      // console.log('formdata', formData)

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryCharge
      }

      switch (method) {
        case "cod":
          const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { token } })

          console.log(response)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else { toast.error(response.data.message)
            navigate('/login')
           }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={' INFORMATION'}></Title>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input onChange={onChangeHandler} name='street' value={formData.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={formData.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zip-Code' />
          <input onChange={onChangeHandler} name='country' value={formData.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      <div className='mt-8 min-w-80'>
        <CartTotal></CartTotal>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={' METHOD'}></Title>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`${method === 'stripe' ? 'bg-green-500' : ''} min-w-3.5 border-gray-400 h-3.5 border rounded-full`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="Stripe Logo" />
            </div>
            <div onClick={() => setMethod("razorpay")} className='flex border-gray-400 items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={` ${method === 'razorpay' ? 'bg-green-500' : ''} min-w-3.5 h-3.5 border-gray-400 border rounded-full`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="Razorpay Logo" />
            </div>
            <div onClick={() => setMethod("cod")} className='flex border-gray-400 items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={` ${method === 'cod' ? 'bg-green-500' : ''}  min-w-3.5 h-3.5 border rounded-full border-gray-400`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='py-3 px-8 text-sm active:bg-gray-700 bg-black text-white'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
