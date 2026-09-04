import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Navbar from "../components/Navbar";
import { BookOpen, Upload, Download, Save } from "lucide-react";

const DashboardGuru = ({ onLogout }) => {
  const [mapel, setMapel] = useState("Bahasa Indonesia");
  const [kelas, setKelas] = useState("8A");
  const [siswa, setSiswa] = useState([
    { id: 1, nama: "Rina", uh: 85, tugas: 90, mid: 88, uas: 87 },
    { id: 2, nama: "Budi", uh: 80, tugas: 82, mid: 85, uas: 83 },
    { id: 3, nama: "Sari", uh: 92, tugas: 89, mid: 93, uas: 94 },
  ]);

  // Fungsi hitung rata-rata dan status
  const hitungRata = (s) => ((s.uh + s.tugas + s.mid + s.uas) / 4).toFixed(1);
  const status = (rata) => (rata >= 75 ? "Lulus" : "Remedial");

  // Ganti nilai
  const handleNilaiChange = (id, field, value) => {
    setSiswa((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [field]: parseInt(value) || 0 } : s
      )
    );
  };

  // Simpan nilai
  const handleSubmit = () => {
    alert(`✅ Nilai ${mapel} kelas ${kelas} berhasil disimpan!`);
    console.table(siswa);
  };

  // Import Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const imported = sheet.map((row, index) => ({
        id: index + 1,
        nama: row.Nama || "",
        uh: row.UH || 0,
        tugas: row.Tugas || 0,
        mid: row.MID || 0,
        uas: row.UAS || 0,
      }));
      setSiswa(imported);
      alert("✅ Data nilai berhasil diimpor dari Excel!");
    };
    reader.readAsArrayBuffer(file);
  };

  // Export Excel
  const handleExport = () => {
    const dataExport = siswa.map((s) => ({
      Nama: s.nama,
      UH: s.uh,
      Tugas: s.tugas,
      MID: s.mid,
      UAS: s.uas,
      Rata_Rata: hitungRata(s),
      Status: status(hitungRata(s)),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nilai Siswa");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Nilai_${mapel}_${kelas}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="guru" onLogout={onLogout} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Guru - Input Nilai
          </h2>
        </div>

        {/* Filter Kelas & Mapel */}
        <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1 text-gray-600">Mata Pelajaran</label>
            <select
              value={mapel}
              onChange={(e) => setMapel(e.target.value)}
              className="border rounded-md p-2 w-60 focus:ring focus:ring-blue-200"
            >
              <option>Bahasa Indonesia</option>
              <option>Bahasa Inggris</option>
              <option>Matematika</option>
              <option>Fisika</option>
              <option>Kimia</option>
              <option>Biologi</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1 text-gray-600">Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border rounded-md p-2 w-40 focus:ring focus:ring-blue-200"
            >
              <option>7A</option>
              <option>8A</option>
              <option>8B</option>
              <option>9A</option>
              <option>9B</option>
            </select>
          </div>

          <div className="flex items-end gap-3">
            <label className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 shadow">
              <Upload size={16} /> Import Excel
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            <button
              onClick={handleExport}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow flex items-center gap-2"
            >
              <Download size={16} /> Export Excel
            </button>
          </div>
        </div>

        {/* Tabel Nilai */}
        <div className="bg-white shadow-md rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 border">No</th>
                <th className="px-4 py-3 border">Nama Siswa</th>
                <th className="px-4 py-3 border">UH</th>
                <th className="px-4 py-3 border">Tugas</th>
                <th className="px-4 py-3 border">MID</th>
                <th className="px-4 py-3 border">UAS</th>
                <th className="px-4 py-3 border">Rata-rata</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((s, i) => {
                const rata = hitungRata(s);
                const lulus = rata >= 75;
                return (
                  <tr
                    key={s.id}
                    className={`text-center transition ${
                      lulus
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-red-50 hover:bg-red-100"
                    }`}
                  >
                    <td className="border px-4 py-2">{i + 1}</td>
                    <td className="border px-4 py-2 text-left">{s.nama}</td>
                    {["uh", "tugas", "mid", "uas"].map((field) => (
                      <td key={field} className="border px-2 py-1">
                        <input
                          type="number"
                          value={s[field]}
                          onChange={(e) => handleNilaiChange(s.id, field, e.target.value)}
                          className="border rounded-md w-16 text-center focus:ring focus:ring-blue-200"
                        />
                      </td>
                    ))}
                    <td className="border px-4 py-2 font-semibold text-gray-800">
                      {rata}
                    </td>
                    <td
                      className={`border px-4 py-2 font-bold ${
                        lulus ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {lulus ? "Lulus" : "Remedial"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow flex items-center gap-2"
          >
            <Save size={18} /> Simpan Nilai
          </button>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-600 py-4 border-t mt-8">
        © 2025 Sistem E-Rapor Sekolah | Dashboard Guru
      </footer>
    </div>
  );
};

export default DashboardGuru;
