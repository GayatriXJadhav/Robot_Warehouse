import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/taskSlice';

const TaskPage = () => {
    const dispatch=useDispatch();
    const [form,setForm]=useState({
        pickup:"",
        drop:"",
        priority:"medium",
        comments:"",
    })
const handleChange=(e)=>{
   setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(addTask(form))
    setForm({pickup:"",drop:"",priority:"medium",comments:""});
}
  return (
    //  bg-gradient-to-br from-teal-50 to-blue-100 
    <div className=' bg-gray-100'>

    
 <div className=" fixed-inset-0 min-h-screen flex justify-center items-center p-6 overflow-hidden">

  <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-10 w-full max-w-2xl">

    <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide">
      Create New Task
    </h2>

    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

      {/* Pickup */}
      <div className="relative">
        <input
          name="pickup"
          value={form.pickup}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-xl px-4 py-3 
                     focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                     focus:outline-none transition"
        />
        <label className="absolute left-4 top-3 text-gray-500 bg-white px-1 pointer-events-none
                          transition-all duration-200
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-teal-600
                          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm 
                          peer-not-placeholder-shown:text-teal-600">
          Pickup Location
        </label>
      </div>

      {/* Drop */}
      <div className="relative">
        <input
          name="drop"
          value={form.drop}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-xl px-4 py-3 
                     focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                     focus:outline-none transition"
        />
        <label className="absolute left-4 top-3 text-gray-500 bg-white px-1 pointer-events-none
                          transition-all duration-200
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-teal-600
                          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm 
                          peer-not-placeholder-shown:text-teal-600">
          Drop Location
        </label>
      </div>

      {/* Priority */}
      <div className="relative col-span-2">
        <label className="text-gray-600 font-medium mb-1 block">Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 
                     focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                     focus:outline-none transition bg-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {/* Comments */}
      <div className="relative col-span-2">
        <textarea
          name="comments"
          value={form.comments}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-xl px-4 py-3 h-28
                     focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                     focus:outline-none transition"
        />
        <label className="absolute left-4 top-3 text-gray-500 bg-white px-1 pointer-events-none
                          transition-all duration-200
                          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-teal-600
                          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm 
                          peer-not-placeholder-shown:text-teal-600">
          Comments
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="col-span-2 w-full bg-gradient-to-r from-teal-500 to-blue-600 
                   text-white py-3 rounded-xl font-semibold tracking-wide shadow-md
                   hover:opacity-90 transition shadow-teal-300"
      >
        Add Task
      </button>
    </form>
  </div>
</div>

</div>
  )
}

export default TaskPage