import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/user'

const Login = () => {
    const navigate = useNavigate()
    const [Values, setValue] = useState({

        email: "",
        password: ""
    })
    const change = (e) => {
        const { name, value } = e.target
        setValue({ ...Values, [name]: value })
    }
    const login_ = async (e) => {
        e.preventDefault()
        try {
            const res = await login(Values)
            localStorage.setItem("userLoggedIn","yes")

            alert(res.data.success);
            navigate("/dashboard")

        } catch (error) {
            alert(error.response.data.error)
        }
    }
    return (

       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
  <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white">
    
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">
        TaskManager
      </h1>
      <p className="text-gray-500">
        Welcome back! Sign in to continue.
      </p>
    </div>

    {/* Form */}
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          name="email"
          value={Values.email}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          required
          placeholder="Enter your password"
          name="password"
          value={Values.password}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      <button
        onClick={login_}
        className="w-full py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Sign In
      </button>

      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>

    )
}

export default Login