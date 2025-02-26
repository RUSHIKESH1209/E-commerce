import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Relatedproduct from '../components/Relatedproduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency ,cartItems,addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState(null)

  const [image, setImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const fetchProductData = async () => {
    const foundProduct = products.find(product => product._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 opacity-100 ease-in'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className="flex-1 flex flex-col-reverse sm:flex-row" >
          <div className="flex overflow-x-auto sm:flex-col sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((image, index) => (
                <img key={index} src={image} alt="" className="w-[24%] sm:w-full sm:mb-2 mt-1 shadow-lg rounded cursor-pointer" onClick={() => setImage(image)} />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full mt-1 sm:mx-3 h-auto rounded shadow-lg' src={image} alt="" />
          </div>
        </div>
        <div className="flex-1 ">
          <h1 className='font-mediumtext-2xl mt-2'>
            {productData.name}
          </h1>

          <div className="flex items-center gap-1  mt-1">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((size, index) => (
                  <button onClick={() => setSelectedSize(size)} key={index} className={` ${size === selectedSize ? 'border-orange-500 border' : ''}  py-2 px-4 bg-gray-100`}>
                    {size}
                  </button>
                ))
              }
            </div>
          </div>

          <button onClick={()=>addToCart( productData._id, selectedSize)} className='py-3 px-8 text-sm active:bg-gray-700 bg-black text-white'>
            Add to cart
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex '>
          <p className='border border-gray-200  py-3 px-5 text-sm'>Description</p>
          <p className='border text-gray-500 border-gray-200  py-3 px-5 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border-gray-200 border py-6 px-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      <Relatedproduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product