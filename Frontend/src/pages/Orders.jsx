import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data && response.data.orders) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error("Error loading orders:", error.message || error);
    }
  };

  useEffect(() => {
    loadOrderdata();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((product, index) => (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20 mr-3'
                  src={product.image?.[0] || '/default-image.jpg'}
                  alt={product.name || 'Product Image'}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{product.name || 'Unknown Product'}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{product.price || 'N/A'}</p>
                    <p>Quantity: {product.quantity || 1}</p>
                    <p className='px-2 sm:px-3 border bg-slate-50'>{product.size || 'L'}</p>
                  </div>
                  <p className='mt-2'>
                    Date <span className='text-gray-400'>
                      {product.date ? new Date(product.date).toLocaleDateString() : 'N/A'}
                    </span>
                  </p>

                </div>
              </div>
              <div className='md:w-1/2 flex justify-center'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{product.status || 'Processing'}</p>
                </div>
                <button className='ml-auto border px-4 py-2 text-sm font-medium rounded-sm'>{product.status}</button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center mt-4'>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
