import { createSlice } from "@reduxjs/toolkit";


const tasksSlice=createSlice({
  name:"tasks",
  initialState:{
    tasks:[],
    lastAssigned:null
  },
  reducers:{
    addTask:(state,action)=>{
        state.tasks.push({
            id:Date.now(),
            ...action.payload,
            createAt:new Date().toISOString()
        })
    },

    removeTask:(state)=>{
        if(state.tasks.length>0){
            const assigned=state.tasks.shift();
            state.lastAssigned=assigned;
        }
    }
  }
})
export const {addTask,removeTask}= tasksSlice.actions;
export default tasksSlice.reducer;