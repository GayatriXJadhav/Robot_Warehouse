import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Bot, ClipboardList, ListTodo } from "lucide-react"; // icons
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.auth.user)
  return (
    <header className="w-full h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      {/* LEFT LOGO */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-cyan-500">RW</div>
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Hello {user}
        </h1>
      </div>

      {/* CENTER MENU — EXACT TABLER STYLE */}
      <nav className="flex items-center gap-8 text-sm font-medium">
        <TabItem to="/" label="Home" icon={<Home size={16} />} />
        <TabItem to="/bots" label="Bots" icon={<Bot size={16} />} />
        <TabItem to="/tasks" label="Tasks" icon={<ClipboardList size={16} />} />
        <TabItem to="/taskQ" label="Task Queue" icon={<ListTodo size={16} />} />
      </nav>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <button className="relative">
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700 transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.657a2 2 0 01-3.715 0M5.25 8.25A6.75 6.75 0 0112 1.5c3.728 
                 0 6.75 3.022 6.75 6.75v3.75l.69 2.763c.093.373.06.77-.093 1.12a1.5 
                 1.5 0 01-1.384.867H6.037a1.5 1.5 0 01-1.384-.867 1.875 1.875 0 
                 01-.093-1.12L5.25 12V8.25z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* PROFILE */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/user")}
        >
          <div className="text-right leading-tight">
            <p className="text-gray-800 text-sm font-semibold">User</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>

          <img
            src="https://i.pravatar.cc/100?img=15"
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
    </header>
  );
};

/* REUSABLE TABLER MENU ITEM */
const TabItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 pb-1 transition ${
        isActive
          ? "text-blue-600 font-semibold border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Navbar;
