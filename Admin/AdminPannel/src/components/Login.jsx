import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + "/api/user/admin", {
                email, password
            })
            if (response.data.success === true) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)

            }
        } catch (err) {

        }
    }

    return (
        <div className=" flex justify-center items-center min-h-screen ">
            <form onSubmit={(e) => onSubmitHandler(e)} className=" flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded-lg shadow-lg">
                <div className="inline-flex items-center gap-2 mb-2 mt-2">
                    <p className="text-3xl prata">Admin Pannel</p>
                </div>
                <p className="text-1xl mt-2 w-full prata ">Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email"
                    required
                />
                <p className="text-1xl mt-2 w-full prata">Password</p>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="password"
                    placeholder="Password"
                    required
                />
                <button className='bg-black text-white w-full py-1 mt-2 px-4 '>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
