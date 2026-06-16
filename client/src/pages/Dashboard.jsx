import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddTask from '../components/AddTask'
import StackTitle from '../components/StackTitle'
import YetToStart from '../components/YetToStart'
import InProgress from '../components/InProgress'
import Completed from '../components/Completed'
import EditTask from '../components/EditTask'
import { getUserDetail } from '../services/task'

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden")
  const [Tasks, setTasks] = useState([]) // flat array of all tasks
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden")
  const [EditTaskId, setEditTaskId] = useState(null)

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await getUserDetail()
      // Make sure backend returns a flat array
      setTasks(res.data.tasks || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()

    const storedEditTaskId = window.sessionStorage.getItem("editTaskId")
    if (storedEditTaskId) {
      setEditTaskDiv("block")
      setEditTaskId(storedEditTaskId)
    }
  }, [AddTaskDiv])

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
  
  {/* Header */}
  <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
    <Header setAddTaskDiv={setAddTaskDiv} />
  </div>

  {/* Dashboard Title */}
  <div className="px-6 pt-6">
    <h1 className="text-3xl font-bold text-slate-800">
      Task Dashboard
    </h1>
    <p className="text-gray-500 mt-1">
      Manage and track your tasks efficiently
    </p>
  </div>

  {/* Task Columns */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

    {/* Yet To Start */}
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-5 hover:shadow-xl transition-all duration-300">
      <StackTitle title="Yet To Start" />
      <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
        {Tasks.filter((t) => t.status === "yetToStart").map((task) => (
          <YetToStart key={task._id} task={task} />
        ))}
      </div>
    </div>

    {/* In Progress */}
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-5 hover:shadow-xl transition-all duration-300">
      <StackTitle title="In Progress" />
      <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
        {Tasks.filter((t) => t.status === "inProgress").map((task) => (
          <InProgress key={task._id} task={task} />
        ))}
      </div>
    </div>

    {/* Completed */}
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-5 hover:shadow-xl transition-all duration-300">
      <StackTitle title="Completed" />
      <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
        {Tasks.filter((t) => t.status === "completed").map((task) => (
          <Completed key={task._id} task={task} />
        ))}
      </div>
    </div>

  </div>

  {/* Add Task Modal */}
  {AddTaskDiv === "block" && (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <AddTask
          setAddTaskDiv={setAddTaskDiv}
          setTasks={setTasks}
          tasks={Tasks}
        />
      </div>
    </>
  )}

  {/* Edit Task Modal */}
  {EditTaskDiv === "block" && (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <EditTask
          EditTaskId={EditTaskId}
          setEditTaskDiv={setEditTaskDiv}
          setTasks={setTasks}
          tasks={Tasks}
        />
      </div>
    </>
  )}
</div>
  )
}

export default Dashboard