import React from "react";

export default function TableNilai({ data }) {
  return (
    <div className="w-2/3 bg-white p-4 shadow rounded">
      <h2 className="font-bold text-lg mb-2">Nilai Pelajaran Siswa</h2>
      <table className="table-auto w-full border">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Mata Pelajaran</th>
            <th className="border px-2 py-1">KKM</th>
            <th className="border px-2 py-1">UH</th>
            <th className="border px-2 py-1">TUGAS</th>
            <th className="border px-2 py-1">MID</th>
            <th className="border px-2 py-1">UAS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{d.mapel}</td>
              <td className="border px-2 py-1">{d.kkm}</td>
              <td className={`border px-2 py-1 ${d.uh < d.kkm ? 'text-red-600' : 'text-blue-700'}`}>{d.uh}</td>
              <td className="border px-2 py-1">{d.tugas}</td>
              <td className="border px-2 py-1">{d.mid}</td>
              <td className="border px-2 py-1">{d.uas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
