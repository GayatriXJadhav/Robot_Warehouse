import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleSave = () => {
    dispatch(updateProfile({ name: newName }));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl p-8 rounded-xl w-[400px] text-center">

        <img
          src="https://i.pravatar.cc/150"
          className="w-24 h-24 mx-auto rounded-full"
        />

        {editMode ? (
          <input
            className="border p-2 rounded mt-4 w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        )}

        <p className="text-gray-600">{user.email}</p>

        <div className="mt-6 space-y-3">
          {editMode ? (
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}

          <button className="w-full bg-red-500 text-white py-2 rounded-md" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
