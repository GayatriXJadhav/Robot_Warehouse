import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Bar,
} from "recharts";
import { fetchbots } from "../features/bots/botsSlice";
import { BarChart, LineChart } from "lucide-react";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]; // active, idle, error

const Analytics = () => {
    const dispatch = useDispatch();
    const { bots } = useSelector((state) => state.bots);
    const { tasks } = useSelector((state) => state.tasks);
    // const { users } = useSelector((state) => state.users ||  [] );

    const [data, setData] = useState([
        { name: "Active", value: 0 },
        { name: "Idle", value: 0 },
        { name: "Error", value: 0 },
    ]);

    useEffect(() => {
        // Fetch immediately on mount
        dispatch(fetchbots());

        // Update every 10 seconds
        const interval = setInterval(() => {
            dispatch(fetchbots());
        }, 10000);

        return () => clearInterval(interval);
    }, [dispatch]);

    // Update chart data whenever bots change
    useEffect(() => {
        const active = bots.filter((b) => b.status === "busy").length;
        const idle = bots.filter((b) => b.status === "idle").length;
        const error = bots.filter((b) => b.status === "error").length;

        setData([
            { name: "Active", value: active },
            { name: "Idle", value: idle },
            { name: "Error", value: error },
        ]);
    }, [bots]);

    const avgBattery =
        bots.length > 0
            ? Math.round(bots.reduce((sum, b) => sum + b.battery, 0) / bots.length)
            : 0;

    const activeTasks = tasks.length;
    const pendingTasks = tasks.length;

    const errorCount = bots.filter((b) => b.status === "error").length;

    // Task queue wait time
    const avgWaitTime =
        tasks.length > 0
            ? Math.round(
                tasks.reduce((sum, t) => sum + (Date.now() - t.createdAt), 0) /
                tasks.length /
                1000
            )
            : 0;
    const priorityData = [
        {
            priority: "High",
            count: tasks.filter((t) => t.priority === "high").length,
        },
        {
            priority: "Medium",
            count: tasks.filter((t) => t.priority === "medium").length,
        },
        {
            priority: "Low",
            count: tasks.filter((t) => t.priority === "low").length,
        },
    ];
    const [queueHistory, setQueueHistory] = useState([]);

    useEffect(() => {
        setQueueHistory((prev) => [
            ...prev.slice(-10),
            { time: new Date().toLocaleTimeString(), queue: pendingTasks },
        ]);
    }, [tasks]);

  

    return (
        <div className="p-6 space-y-10">
            {/* ---------- TOP ROW: BOT UTILIZATION + SYSTEM HEALTH ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bot Utilization */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Bot Utilization</h2>

                    <div className="flex justify-center">
                        <PieChart width={280} height={280}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">System Health Overview</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded shadow-sm">
                            <p className="text-sm">⚡ Average Load</p>
                            <p className="text-2xl font-bold">{activeTasks}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded shadow-sm">
                            <p className="text-sm">🔋 Battery Health</p>
                            <p className="text-2xl font-bold">{avgBattery}%</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded shadow-sm">
                            <p className="text-sm">🕒 Avg Wait Time</p>
                            <p className="text-2xl font-bold">{avgWaitTime}s</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded shadow-sm">
                            <p className="text-sm">🚨 Errors</p>
                            <p className="text-2xl font-bold">{errorCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- QUEUE LENGTH OVER TIME ---------- */}{/* ---------- PRIORITY DISTRIBUTION ---------- */} 
            <div className=" p-6 rounded-lg shadow flex flex-row justify-between">
                 <div className="bg-white p-6 rounded-lg shadow ">
                <h2 className="text-xl font-semibold mb-4">Queue Length Over Time</h2>

                <LineChart width={520} height={300} data={queueHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="queue"
                        stroke="#8884d8"
                        strokeWidth={3}
                    />
                </LineChart>
            </div>

            
               <div className="bg-white p-6 rounded-lg shadow ">
                <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>

                <BarChart width={520} height={300} data={priorityData}>
                    <XAxis dataKey="priority" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
                </div>
            </div>

          
        </div>
    );
};

export default Analytics;
