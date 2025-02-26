import React, { useState } from 'react'
import { assets } from '../admin_assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("Men")
  const [subcategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setbestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [addButton, setAddButton] = useState(false)


  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setAddButton(true);
    try {
      const formData = new FormData();
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subcategory)
      formData.append('bestSeller', bestSeller ? "true" : "false");
      console.log(JSON.stringify(bestSeller))
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setbestSeller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setprice("")

      } else {
        toast.error(response.data.message)
      }

    } catch (err) {
      console.log("error", err)
      toast.error(err.message)


    } finally {
      setAddButton(false);
    }
  }

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>

        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" name="" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" name="" placeholder='Write content here here' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setcategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product subcategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2 '>Product Price</p>
          <input onChange={(e) => setprice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
        </div>


      </div>
      <div className="flex gap-3">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <div
            key={size}
            onClick={() => handleSizeClick(size)}
            className="cursor-pointer">
            <p
              className={`px-3 py-1 cursor-pointer  ${sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                }`}>
              {size}
            </p>
          </div>
        ))}
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={(e) => setbestSeller(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor="bestSeller"> Add to Bestseller</label>
      </div>


      <button type='submit' disabled={addButton} className='w-28 py-3 mt-4 bg-black text-white disabled:opacity-50'>
        {addButton ? "Adding..." : "ADD"}
      </button>
    </form>
  )
}

export default Add