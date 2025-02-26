import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { token, setToken, backendURL, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Trim values
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name?.trim();

    // Basic validation
    if (currentState === "signup" && !trimmedName) {
      toast.error("Name is required for signup");
      return;
    }
    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Email and password are required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      toast.error("Invalid email format");
      return;
    }
    if (trimmedPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      let response;
      if (currentState === "signup") {
        response = await axios.post(`${backendURL}/api/user/register`, {
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        });
      } else {
        response = await axios.post(`${backendURL}/api/user/login`, {
          email: trimmedEmail,
          password: trimmedPassword,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful!");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
  },[])


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded-lg shadow-lg">
        <div className="inline-flex items-center gap-2 mb-2 mt-2">
          <p className="text-3xl prata">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === 'signup' && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Name"
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="password"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
         <a href="https://e-commerce-admin-fawn-tau.vercel.app/">Admin Panel</a>

          {currentState === 'login' ? (
            <p onClick={() => setCurrentState('signup')} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('login')} className="cursor-pointer">
              Login
            </p>
          )}
        </div>

        <button className='bg-black text-white py-2 px-4 '>
          {currentState === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;

