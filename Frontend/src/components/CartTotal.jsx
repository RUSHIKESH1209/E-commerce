import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const { cartItems, deliveryCharge, currency, getCartAmount } = useContext(ShopContext)

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'}></Title>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}</p>
                </div>
                <hr className='text-gray-400' />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p> {currency}{deliveryCharge}</p>

                </div>
                <hr className='text-gray-400' />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0:getCartAmount() + deliveryCharge}</b>

                </div>
            </div>
        </div>
    )
}

export default CartTotal


