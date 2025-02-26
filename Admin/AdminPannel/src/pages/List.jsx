import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.products) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error.message);
    }
  };


 const removeItem = async (id) => {
  if (!token) {
    toast.error("Unauthorized: No token found!");
    return;
  }

  try {
    const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchlist();  // Refresh the list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error removing product:", error);
    toast.error(error.response?.data?.message || "Failed to remove product");
  }
};

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <p className="mb-4 text-lg font-semibold">All Products</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-200 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b">
            <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <p className="truncate">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="font-semibold">{currency}{item.price}</p>
            <button onClick={() => { removeItem(item._id) }} className="text-red-500 hover:text-red-700 font-semibold transition">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
