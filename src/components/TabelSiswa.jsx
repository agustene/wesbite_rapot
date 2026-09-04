import React from "react";

const TabelSiswa = () => {
  const siswa = [
    { nama: "Andi", kelas: "8A", nilai: 90 },
    { nama: "Budi", kelas: "8A", nilai: 82 },
    { nama: "Citra", kelas: "8A", nilai: 88 },
  ];

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2">Nama</th>
          <th className="border px-4 py-2">Kelas</th>
          <th className="border px-4 py-2">Nilai</th>
          <th className="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {siswa.map((s, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{s.nama}</td>
            <td className="border px-4 py-2">{s.kelas}</td>
            <td className="border px-4 py-2">{s.nilai}</td>
            <td className="border px-4 py-2">
              <button className="text-blue-600 hover:underline">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelSiswa;
