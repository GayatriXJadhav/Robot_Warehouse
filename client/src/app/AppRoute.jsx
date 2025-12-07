import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import TaskPage from '../pages/TaskForm'
import TaskQueue from '../pages/TaskQueue'
import BotStatus from '../pages/BotStatus'
import User from '../pages/User'


const AppRoute = () => {
  return (
    <Routes>
     
         <Route path='/' element={<Home/>}>Home</Route>
        <Route path='/home' element={<Home/>}>Home</Route>
         <Route path='/Bots' element={<BotStatus/>}>Bots</Route>
          <Route path='/tasks' element={<TaskPage/>}>Task Allocation</Route>
        <Route path='/taskQ' element={<TaskQueue/>}>Task Queue</Route>
            <Route path='/user' element={<User/>}>User</Route>
    </Routes>
  )
}

export default AppRoute;