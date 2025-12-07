import React from "react";

const BotCard = ({ bot }) => {
  const batteryColor =
    bot.battery > 60
      ? "from-emerald-400 to-emerald-500"
      : bot.battery > 30
      ? "from-amber-400 to-amber-500"
      : "from-red-500 to-red-600";

  const statusColor =
    bot.status === "idle"
      ? "bg-gray-100 text-gray-700 border-gray-300"
      : bot.status === "busy"
      ? "bg-blue-100 text-blue-800 border-blue-300"
      : bot.status === "charging"
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className="
      relative 
      bg-white/70 backdrop-blur-xl 
      border border-gray-200/60 
      rounded-2xl p-6 
      shadow-md hover:shadow-xl 
      transition-all duration-300
      overflow-hidden
    ">
      {/* Glow Top Border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 opacity-80"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-xl text-gray-900 tracking-wide">
          Bot #{bot.id}
        </h3>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColor}`}
        >
          {bot.status.toUpperCase()}
        </span>
      </div>

      {/* Battery Section */}
      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-1">Battery</p>

        <div className="flex items-center gap-3">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${bot.battery}%` }}
              className={`h-full bg-gradient-to-r ${batteryColor} transition-all duration-300`}
            ></div>
          </div>

          <span className="font-semibold text-gray-900">{bot.battery}%</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-gray-500 text-xs">Current Task</p>
          <p className="font-semibold text-gray-900 mt-1">
            {bot.currentTask || "None"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-gray-500 text-xs">Speed</p>
          <p className="font-semibold text-gray-900 mt-1">
            {bot.speed} m/s
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-xs text-gray-500 mt-5 text-right">
        Updated • {new Date(bot.lastUpdated).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default BotCard;
