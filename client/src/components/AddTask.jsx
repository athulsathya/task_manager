import React, { useState } from "react";
import { AddtaskOne } from "../services/task";

const AddTask = ({ setAddTaskDiv, setTasks, tasks }) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  // AddTask.jsx
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await AddtaskOne(Values);
      if (res.data.success) {
        alert("Task added successfully");
        setAddTaskDiv("hidden");

        // Update dashboard state immediately
        setTasks((prev) => {
          const updatedTasks = [...prev];
          const index = { yetToStart: 0, inProgress: 1, completed: 2 }[
            Values.status
          ];
          if (!updatedTasks[index])
            updatedTasks[index] = { [Values.status]: [] };
          updatedTasks[index][Values.status].push({
            ...Values,
            _id: res.data.taskId,
          });
          return updatedTasks;
        });

        setValues({
          title: "",
          description: "",
          priority: "low",
          status: "yetToStart",
        });
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">

  {/* Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-slate-800">
      Create New Task
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Add a new task and organize your workflow
    </p>
  </div>

  <form className="space-y-5" onSubmit={addTask}>

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
        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        name="description"
        placeholder="Describe your task..."
        value={Values.description}
        onChange={change}
        required
        rows={5}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
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
        + Create Task
      </button>

      <button
        type="button"
        onClick={() => setAddTaskDiv("hidden")}
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
      >
        Cancel
      </button>

    </div>

  </form>
</div>
  );
};

export default AddTask;
