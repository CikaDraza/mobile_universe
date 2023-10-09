import {NavLink} from "react-router-dom";
import {useState} from "react";
import {userStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";

export default function Login() {
    const { setCurrentUser, setToken } = userStateContext();
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
    }

    return (
        <div className="w-2/4 mx-auto mt-20">
            <div>
                <h2 className="mt-6 mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
                {
                    error &&
                    <div className="w-full p-2 border rounded-lg mb-4 border-l-8 border-l-red-700">
                        <p className="text-red-700">{error}</p>
                    </div>
                }
                <form className="space-y-6" onSubmit={handleLogin} method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    )
}
