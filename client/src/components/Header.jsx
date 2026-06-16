import React from 'react'
import { IoLogOutOutline } from "react-icons/io5"
import { logout } from '../services/user'
import { useNavigate } from 'react-router-dom'

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate()

  const logout_ = async () => {
    try {
      const res = await logout()
      alert(res.data.message)
      localStorage.removeItem("userLoggedIn") // fixed
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* Logo */}
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        TaskManager
      </h1>
      <p className="text-xs text-gray-500">
        Organize your work efficiently
      </p>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4">
      <button
        onClick={() => setAddTaskDiv("block")}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        + Add Task
      </button>

      <button
        onClick={logout_}
        className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <IoLogOutOutline size={22} />
      </button>
    </div>

  </div>
</div>
  )
}

export default Header