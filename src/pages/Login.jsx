import React, { useState } from "react";
import { GraduationCap, Lock, User } from "lucide-react";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("siswa");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = {
    siswa: { username: "siswa123", password: "12345" },
    guru: { username: "guru123", password: "12345" },
    admin: { username: "admin123", password: "12345" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[role];
    if (username === user.username && password === user.password) {
      onLogin(role);
    } else {
      alert("❌ Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 border-t-4 border-blue-600">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full mb-3">
            <GraduationCap size={40} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sistem Rapor Sekolah
          </h1>
          <p className="text-gray-500 text-sm">
            Silakan login sesuai peran Anda
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Masuk sebagai
            </label>
            <select
              className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="siswa">👨‍🎓 Siswa</option>
              <option value="guru">👩‍🏫 Guru</option>
              <option value="admin">🧑‍💼 Admin</option>
            </select>
          </div>

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded-lg p-2 pl-9 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-2 pl-9 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Masuk ke Dashboard
          </button>
        </form>

        {/* Info Login */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            <b>Demo akun:</b>
          </p>
          <p>Siswa → siswa123 / 12345</p>
          <p>Guru → guru123 / 12345</p>
          <p>Admin → admin123 / 12345</p>
        </div>

        <footer className="mt-6 text-center text-xs text-gray-400">
          © 2025 | Sistem Rapor Sekolah by aldaka triyanti
        </footer>
      </div>
    </div>
  );
}
