import React, { useState } from 'react';

export default function GradeForm({ onAdd }) {
  const [form, setForm] = useState({ nama: '', mapel: '', nilai: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.mapel || !form.nilai) return;
    onAdd(form);
    setForm({ nama: '', mapel: '', nilai: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded space-y-2">
      <input
        className="border p-2 w-full rounded"
        placeholder="Nama Siswa"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.target.value })}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder="Mata Pelajaran"
        value={form.mapel}
        onChange={(e) => setForm({ ...form, mapel: e.target.value })}
      />
      <input
        type="number"
        className="border p-2 w-full rounded"
        placeholder="Nilai"
        value={form.nilai}
        onChange={(e) => setForm({ ...form, nilai: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-3 py-2 rounded w-full hover:bg-blue-600">Tambah</button>
    </form>
  );
}
