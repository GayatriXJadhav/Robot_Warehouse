import React from "react";

const priorityColors = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-300",
  medium: "bg-amber-100 text-amber-700 border-amber-300",
  high: "bg-red-100 text-red-700 border-red-300",
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-700">Task #{task.id}</h2>

        <span
          className={`px-3 py-1 text-sm font-medium rounded-full border ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium text-gray-600">Pickup:</span>{" "}
          <span className="text-gray-800">{task.pickup}</span>
        </p>

        <p>
          <span className="font-medium text-gray-600">Drop:</span>{" "}
          <span className="text-gray-800">{task.drop}</span>
        </p>

        <p>
          <span className="font-medium text-gray-600">Created:</span>{" "}
          <span className="text-gray-800">
            {new Date(task.createdAt).toLocaleTimeString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
