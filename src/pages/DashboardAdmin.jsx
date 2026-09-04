import React, { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../components/Navbar";
import { Users, BookOpen, TrendingUp, FileSpreadsheet } from "lucide-react";

export default function DashboardAdmin({ onLogout }) {
  const [gurus, setGurus] = useState([
    { id: 1, nama: "Ibu Sinta", mapel: "Bahasa Inggris" },
    { id: 2, nama: "Pak Budi", mapel: "Matematika" },
  ]);

  const [siswas, setSiswas] = useState([
    { id: 1, nama: "Andi", kelas: "8A", nilai: 87 },
    { id: 2, nama: "Rina", kelas: "9A", nilai: 90 },
    { id: 3, nama: "Dimas", kelas: "8A", nilai: 92 },
  ]);

  const [guruBaru, setGuruBaru] = useState({ nama: "", mapel: "" });
  const [siswaBaru, setSiswaBaru] = useState({ nama: "", kelas: "", nilai: "" });

  // === CRUD Guru ===
  const tambahGuru = (e) => {
    e.preventDefault();
    if (!guruBaru.nama || !guruBaru.mapel) return alert("Lengkapi data guru!");
    setGurus([...gurus, { ...guruBaru, id: Date.now() }]);
    setGuruBaru({ nama: "", mapel: "" });
  };
  const hapusGuru = (id) => setGurus(gurus.filter((g) => g.id !== id));

  // === CRUD Siswa ===
  const tambahSiswa = (e) => {
    e.preventDefault();
    if (!siswaBaru.nama || !siswaBaru.kelas || !siswaBaru.nilai)
      return alert("Lengkapi data siswa!");
    setSiswas([...siswas, { ...siswaBaru, id: Date.now() }]);
    setSiswaBaru({ nama: "", kelas: "", nilai: "" });
  };
  const hapusSiswa = (id) => setSiswas(siswas.filter((s) => s.id !== id));

  // === Import Excel ===
  const importExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      const formatted = json.map((row, i) => ({
        id: Date.now() + i,
        nama: row.Nama || "",
        kelas: row.Kelas || "",
        nilai: row.Nilai || 0,
      }));
      setSiswas([...siswas, ...formatted]);
      alert("✅ Data siswa berhasil diimpor!");
    };
    reader.readAsArrayBuffer(file);
  };

  // === Rekap Nilai per Kelas ===
  const kelasUnik = [...new Set(siswas.map((s) => s.kelas))];
  const rekap = kelasUnik.map((kls) => {
    const siswaKelas = siswas.filter((s) => s.kelas === kls);
    const rata =
      siswaKelas.reduce((acc, cur) => acc + parseFloat(cur.nilai), 0) /
      siswaKelas.length;
    return { kelas: kls, rata: rata.toFixed(1), jumlah: siswaKelas.length };
  });

  // === Statistik Cepat ===
  const totalGuru = gurus.length;
  const totalSiswa = siswas.length;
  const totalKelas = kelasUnik.length;
  const rataSekolah = (
    siswas.reduce((a, b) => a + parseFloat(b.nilai), 0) / siswas.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="Admin" onLogout={onLogout} />

      <div className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-sm text-gray-500">
              Kelola data guru, siswa, dan pantau rekap nilai sekolah.
            </p>
          </div>
        </div>

        {/* Statistik Cepat */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-600 text-white rounded-xl p-5 flex items-center gap-3 shadow">
            <Users size={40} />
            <div>
              <p className="text-sm">Total Guru</p>
              <h2 className="text-2xl font-bold">{totalGuru}</h2>
            </div>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-5 flex items-center gap-3 shadow">
            <BookOpen size={40} />
            <div>
              <p className="text-sm">Total Siswa</p>
              <h2 className="text-2xl font-bold">{totalSiswa}</h2>
            </div>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-5 flex items-center gap-3 shadow">
            <FileSpreadsheet size={40} />
            <div>
              <p className="text-sm">Jumlah Kelas</p>
              <h2 className="text-2xl font-bold">{totalKelas}</h2>
            </div>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-5 flex items-center gap-3 shadow">
            <TrendingUp size={40} />
            <div>
              <p className="text-sm">Rata-Rata Sekolah</p>
              <h2 className="text-2xl font-bold">{rataSekolah}</h2>
            </div>
          </div>
        </div>

        {/* Data Guru dan Siswa */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Data Guru */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              👩‍🏫 Data Guru
            </h3>

            <form
              onSubmit={tambahGuru}
              className="flex flex-col md:flex-row gap-3 mb-4"
            >
              <input
                type="text"
                placeholder="Nama Guru"
                value={guruBaru.nama}
                onChange={(e) =>
                  setGuruBaru({ ...guruBaru, nama: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Mata Pelajaran"
                value={guruBaru.mapel}
                onChange={(e) =>
                  setGuruBaru({ ...guruBaru, mapel: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Tambah
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded">
                <thead className="bg-blue-100 text-blue-900">
                  <tr>
                    <th className="px-4 py-2 border">Nama</th>
                    <th className="px-4 py-2 border">Mapel</th>
                    <th className="px-4 py-2 border text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {gurus.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{g.nama}</td>
                      <td className="border px-4 py-2">{g.mapel}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => hapusGuru(g.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Siswa */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              🎓 Data Siswa
            </h3>

            <form
              onSubmit={tambahSiswa}
              className="flex flex-col md:flex-row gap-3 mb-3"
            >
              <input
                type="text"
                placeholder="Nama Siswa"
                value={siswaBaru.nama}
                onChange={(e) =>
                  setSiswaBaru({ ...siswaBaru, nama: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Kelas"
                value={siswaBaru.kelas}
                onChange={(e) =>
                  setSiswaBaru({ ...siswaBaru, kelas: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Nilai"
                value={siswaBaru.nilai}
                onChange={(e) =>
                  setSiswaBaru({ ...siswaBaru, nilai: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Tambah
              </button>
            </form>

            {/* Import Excel */}
            <div className="mb-3">
              <label className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded cursor-pointer">
                📂 Import Excel
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={importExcel}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500 ml-2">
                Format: Nama, Kelas, Nilai
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded">
                <thead className="bg-green-100 text-green-900">
                  <tr>
                    <th className="px-4 py-2 border">Nama</th>
                    <th className="px-4 py-2 border">Kelas</th>
                    <th className="px-4 py-2 border">Nilai</th>
                    <th className="px-4 py-2 border text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {siswas.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{s.nama}</td>
                      <td className="border px-4 py-2">{s.kelas}</td>
                      <td className="border px-4 py-2 text-center">
                        {s.nilai}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => hapusSiswa(s.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Rekap Nilai */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">
            📊 Rekap Nilai per Kelas
          </h3>
          <table className="min-w-full text-sm border">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="px-4 py-2 border">Kelas</th>
                <th className="px-4 py-2 border">Rata-Rata</th>
                <th className="px-4 py-2 border">Jumlah Siswa</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{r.kelas}</td>
                  <td className="border px-4 py-2 text-center">{r.rata}</td>
                  <td className="border px-4 py-2 text-center">{r.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="text-center text-xs text-gray-500 mt-10 pb-6">
          © 2025 | Sistem Rapor Sekolah by Rino Oktavianto
        </footer>
      </div>
    </div>
  );
}
