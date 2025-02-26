import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import {products} from "../assets/frontend_assets/assets"
import axios from 'axios';
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const deliveryCharge = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) { toast.error('Please select a size'); return; }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { itemId, size }, {
                    headers: { token }
                })
            } catch (error) {
                console.log(error)
                toast.error(error.message)

            }
        }
        console.log(cartData)
    }

    const getCartCount = () => {
        let count = 0;

        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size]) {
                        count += cartItems[item][size];
                    }
                } catch (error) {
                    console.error('Error counting cart items:', error);
                }
            }
        }
        return count;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendURL + "/api/cart/update", { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = async => {
        let amount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                const product = products.find(product => product._id === item);
                if (product) {
                    amount += product.price * cartItems[item][size];
                }
            }
        }
        return amount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendURL + "/api/product/list")
            if (response.data.products) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)


        }
    }
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendURL + "/api/cart/get", {}, { headers: { token } })

            if (response.data.cartData) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }

    }

    useEffect(() => {
        getProductsData()
    }, [])


    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            
        }
    }, [token])

    useEffect(() => {
        if (isLoggedIn) {
            getUserCart(localStorage.getItem("token"))
        }
    }, [isLoggedIn,token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    
    const value = {
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
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;