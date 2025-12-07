import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import botReducer from "../features/bots/botsSlice"
import tasksReducer from "../features/tasks/taskSlice"
import authReducer from "../features/auth/authSlice"
const store=configureStore({
    reducer:{
    auth:authReducer,
    bots:botReducer,
    tasks:tasksReducer

    }
})
export default store;