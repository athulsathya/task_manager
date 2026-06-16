import React from 'react'

const TaskCard = ({ data, setEditTaskDiv, setEditTaskId }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault()
    window.sessionStorage.setItem("editTaskId", id)
    setEditTaskDiv("block")
    setEditTaskId(id)
  }

  return (
   <button
  onClick={(event) => showEditDiv(event, data._id)}
  className="w-full bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
>
  {/* Header */}
  <div className="flex items-start justify-between gap-3">
    <h2 className="font-semibold text-slate-800 text-lg line-clamp-1">
      {data.title}
    </h2>

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${
        data.priority === "low"
          ? "bg-green-100 text-green-700"
          : data.priority === "medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {data.priority}
    </span>
  </div>

  {/* Divider */}
  <div className="h-px bg-gray-100 my-3"></div>

  {/* Description */}
  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
    {data.description}
  </p>

  {/* Footer */}
  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
    <span className="text-xs text-gray-400">
      Click to edit
    </span>

    <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
      View
      <span>→</span>
    </div>
  </div>
</button>
  )
}

export default TaskCard