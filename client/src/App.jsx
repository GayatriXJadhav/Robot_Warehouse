import React, { useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppRoute from "./app/appRoute";
import { useDispatch, useSelector } from "react-redux";
import { assignTaskToBot, completeTaskForBot } from "./features/bots/botsSlice";
import { removeTask } from "./features/tasks/taskSlice";
import AuthPage from "./pages/AuthPage";




function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const bots = useSelector((state) => state.bots.bots);
  const botsRef = useRef(bots);
  const tasksRef = useRef(tasks);

  useEffect(() => {
    botsRef.current = bots;
  }, [bots]);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTasks = tasksRef.current;
      const currentBots = botsRef.current;

      if (currentTasks.length === 0) return;

      const task = currentTasks[0];
      // dispatch(removeTask());

      const idleBot = currentBots.find((b) => b.status === "idle");

      if (idleBot) {
        dispatch(
          assignTaskToBot({
            botId: idleBot.id,
            taskId: task.id,
            taskDuration: 8000,
          })
        );
        setTimeout(() => {
          dispatch(completeTaskForBot({ botId: idleBot.id }));
          console.log(`🟡 Bot ${idleBot.id} completed Task ${task.id}`);
        }, 8000);

        dispatch(removeTask());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <BrowserRouter>
  <Routes>

    {/* Public route (Login) */}
    <Route path="/login" element={<AuthPage />} />

    {/* Protected routes */}
    <Route
      path="/*"
      element={
        isLoggedIn ? (
          <>
            <Navbar />
            <AppRoute />
          </>
        ) : (
          <Navigate to="/login" />
        )
      }
    />
    
  </Routes>
</BrowserRouter>
      
    </>
  );
}

export default App;
