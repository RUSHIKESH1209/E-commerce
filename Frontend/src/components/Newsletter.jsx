import React from 'react'

const Newsletter = () => {

    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
    return (

        <div className='text-center'>
            <p style={{ color: '#FF6B6B' }} className='text-2xl text-gray-800'> Subscribe Now and get 20% off</p>
            <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sequi.</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input onSubmit={onSubmitHandler} type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your Email' required />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default Newsletter