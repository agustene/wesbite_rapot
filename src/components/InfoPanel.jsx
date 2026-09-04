import React from "react";

export default function InfoPanel({ siswa }) {
  return (
    <div className="w-1/3 space-y-4">
      <div className="bg-blue-600 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">SISWA</h2>
        <p className="mt-2 font-semibold">{siswa.nama}</p>
        <p>{siswa.kelas}</p>
        <p>Jenis Kelamin: {siswa.jk}</p>
        <div className="mt-3 space-y-1 text-sm">
          <p>Nilai UH: {siswa.nilai.UH}</p>
          <p>Nilai TUGAS: {siswa.nilai.TUGAS}</p>
          <p>Nilai MID: {siswa.nilai.MID}</p>
          <p>Nilai UAS: {siswa.nilai.UAS}</p>
        </div>
      </div>

      <div className="bg-green-600 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">WALI MURID</h2>
        <p>{siswa.waliMurid}</p>
        <p className="text-sm">Username: {siswa.username}</p>
      </div>

      <div className="bg-purple-700 text-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">WALI KELAS</h2>
        <p>{siswa.waliKelas}</p>
        <span className="bg-white text-purple-700 px-2 py-1 rounded text-xs font-bold mt-2 inline-block">
          Active
        </span>
      </div>
    </div>
  );
}
