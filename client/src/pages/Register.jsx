import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { signUp } from '../services/user'


const Register = () => {
  const navigate= useNavigate()
    const [Values, setValue] = useState({
        username: "",
        email: "",
        password: ""
    })
    const change = (e) => {
        const { name, value } = e.target
        setValue({ ...Values, [name]: value })
    }
    const register = async (e) => {
        e.preventDefault()
        try {
        const res= await signUp(Values)
        alert(res.data.success);
        navigate("/login")
        
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
    
    {/* Logo & Heading */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">
        Personal TaskManager
      </h1>
      <p className="text-gray-500">
        Create your account and start managing tasks
      </p>
    </div>

    {/* Form */}
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          required
          placeholder="Enter username"
          name="username"
          value={Values.username}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          required
          placeholder="Enter email"
          name="email"
          value={Values.email}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          required
          placeholder="Enter password"
          name="password"
          value={Values.password}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <button
        onClick={register}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
      >
        Create Account
      </button>

      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-700 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>
    )
}

export default Register