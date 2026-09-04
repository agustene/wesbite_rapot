import React from 'react';

export default function Rekap({ data }) {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-xl font-semibold mb-3">Rekap Nilai Siswa</h2>
      <table className="table-auto w-full border">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-2 py-1">Nama</th>
            <th className="border px-2 py-1">Mapel</th>
            <th className="border px-2 py-1">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{d.nama}</td>
              <td className="border px-2 py-1">{d.mapel}</td>
              <td className="border px-2 py-1">{d.nilai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
