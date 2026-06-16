import React, { useEffect, useState } from 'react'
import { Delete_Task,Edit_Task,getTask } from '../services/task'

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart",
        _id: ""
    })

    const change = (e) => {
        const { name, value } = e.target
        setValues({ ...Values, [name]: value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTask(EditTaskId)
                if (res.data.taskDetails) {
                    setValues(res.data.taskDetails)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (EditTaskId) fetchData()
    }, [EditTaskId])

    const editTask = async (e) => {
        e.preventDefault()
        try {
            const res = await Edit_Task(Values._id, Values)
            if (res.data.success) {
                alert("Task updated successfully")
                window.sessionStorage.removeItem("editTaskId")
                setEditTaskDiv("hidden")
            }
        } catch (error) {
            alert(error?.response?.data?.error || "Something went wrong!")
        }
    }

    const deleteTask = async () => {
        try {
            const res = await Delete_Task(Values._id)
            if (res.data.success) {
                alert("Task deleted successfully")
                window.sessionStorage.removeItem("editTaskId")
                setEditTaskDiv("hidden")
            }
        } catch (error) {
            alert(error?.response?.data?.error || "Something went wrong!")
        }
    }

    return (
       <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
  
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Edit Task
      </h1>
      <p className="text-sm text-gray-500">
        Update task details and progress
      </p>
    </div>
  </div>

  <form className="space-y-5" onSubmit={editTask}>

    {/* Title */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Task Title
      </label>
      <input
        type="text"
        placeholder="Enter task title"
        name="title"
        value={Values.title}
        onChange={change}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        name="description"
        placeholder="Task description..."
        value={Values.description}
        onChange={change}
        required
        rows={5}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
    </div>

    {/* Priority & Status */}
    <div className="grid md:grid-cols-2 gap-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>

        <select
          name="priority"
          value={Values.priority}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>

        <select
          name="status"
          value={Values.status}
          onChange={change}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="yetToStart">⏳ Yet To Start</option>
          <option value="inProgress">🚀 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

    </div>

    {/* Buttons */}
    <div className="flex flex-col md:flex-row gap-3 pt-4">

      <button
        type="submit"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Save Changes
      </button>

      <button
        type="button"
        onClick={deleteTask}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Delete Task
      </button>

      <button
        type="button"
        onClick={() => setEditTaskDiv("hidden")}
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
      >
        Cancel
      </button>

    </div>

  </form>
</div>
    )
}

export default EditTask