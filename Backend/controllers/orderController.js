import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";




// COD method order placing

const placeOrder = async (req, res) => {
    try {
        const { userId, address, amount, items } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "cod",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartdata: {} })

        res.json({ success: true, message: "OrderPlaced" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}



// stripe method order placing

const placeOrderStripe = async (req, res) => {

}





// razor method order placing

const placeOrderRazorpay = async (req, res) => {

}




// all orders data for admin pannel

const allOrders = async (req, res) => {
    try {
        const orders= await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.error( error);
        res.status(500).json({ success: false, message: error.message });        
    }

}




// user order data for frontend

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId }).lean();

        res.json({ success: true, orders });
    } catch (error) {
        console.error( error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//update order status from admin

const updateStatus = async (req, res) => {

    try {
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true ,message:"status updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }


