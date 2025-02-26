import express from "express";

import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from "../middleware/adminauth.js";
import authUser from "../middleware/auth.js";


const orderRouter=express.Router()


// Admin
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStatus)

// payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razor',authUser,placeOrderRazorpay)

// user

orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter;