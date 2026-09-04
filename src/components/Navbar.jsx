import React from "react";

export default function Navbar({ title, onLogout, nama }) {
  return (
    <div className="bg-green-600 text-white flex justify-between items-center p-3 px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <span>{nama}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
