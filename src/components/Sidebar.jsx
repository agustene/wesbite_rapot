import React from 'react';

export default function Sidebar({ onMenuClick }) {
  return (
    <div className="w-56 bg-gray-100 h-screen p-4">
      <ul className="space-y-3">
        <li>
          <button onClick={() => onMenuClick('dashboard')} className="w-full text-left p-2 rounded hover:bg-blue-200">
            🏠 Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => onMenuClick('rekap')} className="w-full text-left p-2 rounded hover:bg-blue-200">
            📋 Rekap Nilai
          </button>
        </li>
      </ul>
    </div>
  );
}
