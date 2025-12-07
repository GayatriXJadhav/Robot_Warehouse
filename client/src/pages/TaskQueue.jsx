import React, { useDeferredValue, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../features/tasks/taskSlice";
import { assignTaskToBot,completeTaskForBot } from "../features/bots/botsSlice";
import TaskCard from "../components/TaskCard";

const TaskQueue = () => {
  const dispatch=useDispatch();

  const tasks=useSelector((state)=>state.tasks.tasks)
  return (
        <div className=' bg-gray-100'>
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Task Queue
        </h1>

        {tasks.length === 0 && (
          <p className="text-gray-500 italic">No pending tasks</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
    
</div>
  );
};

export default TaskQueue;
