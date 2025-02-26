import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../admin_assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.orders) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order status updated!");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-4">Your Orders</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <img src={assets.parcel_icon} alt="Order Icon" className="w-12 h-12" />
                <div className="flex-1">
                  <p className="text-lg font-medium">Order #{index + 1}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-semibold text-blue-600">
                  {currency}{order.amount}
                </p>
              </div>

              {/* Order Items */}
              <div className="mt-4">
                <p className="font-semibold">Items Ordered:</p>
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} × {item.quantity}{' '}
                      <span className="px-2 py-1 bg-gray-200 rounded">{item.size}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="mt-4">
                <p className="font-semibold">Shipping Address:</p>
                <p className="text-sm text-gray-700 mt-1">
                  {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <p className="text-sm font-medium mt-1">Phone: {order.address.phone}</p>
              </div>

              {/* Payment & Status */}
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">Payment:</span>{' '}
                    {order.payment ? 'Paid' : ' Pending'}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Method:</span> {order.paymentMethod}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 bg-white"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;