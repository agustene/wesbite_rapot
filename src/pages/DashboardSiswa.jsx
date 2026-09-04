import React from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FileDown, BookOpen, GraduationCap } from "lucide-react";

export default function DashboardSiswa({ onLogout }) {
  const siswa = {
    nama: "Alvaro Morata",
    kelas: "X IPA A",
    jk: "Laki-laki",
    waliMurid: "Soekarno",
    username: "am6234",
    waliKelas: "Guru Bahasa Indonesia",
  };

  const dataPelajaran = [
    { mapel: "Bahasa Indonesia", kkm: 80, uh: 85, tugas: 90, mid: 88, uas: 92 },
    { mapel: "Bahasa Inggris", kkm: 75, uh: 70, tugas: 74, mid: 72, uas: 75 },
    { mapel: "Matematika", kkm: 75, uh: 60, tugas: 65, mid: 70, uas: 68 },
    { mapel: "Fisika", kkm: 78, uh: 80, tugas: 78, mid: 79, uas: 82 },
    { mapel: "Kimia", kkm: 75, uh: 85, tugas: 88, mid: 86, uas: 90 },
    { mapel: "Biologi", kkm: 75, uh: 65, tugas: 70, mid: 68, uas: 72 },
    { mapel: "PPKN", kkm: 70, uh: 88, tugas: 90, mid: 87, uas: 89 },
  ];

  const rataRata = (
    dataPelajaran.reduce((acc, d) => acc + (d.uh + d.tugas + d.mid + d.uas) / 4, 0) /
    dataPelajaran.length
  ).toFixed(2);

  const belumLulus = dataPelajaran.filter(
    (d) => (d.uh + d.tugas + d.mid + d.uas) / 4 < d.kkm
  ).length;

  // === Fungsi generate PDF ===
  const handleCetakRapot = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RAPOR SISWA", 14, 20);

    doc.setFontSize(12);
    doc.text(`Nama: ${siswa.nama}`, 14, 30);
    doc.text(`Kelas: ${siswa.kelas}`, 14, 37);
    doc.text(`Wali Kelas: ${siswa.waliKelas}`, 14, 44);
    doc.text(`Wali Murid: ${siswa.waliMurid}`, 14, 51);

    const tableData = dataPelajaran.map((d, i) => {
      const avg = ((d.uh + d.tugas + d.mid + d.uas) / 4).toFixed(1);
      const lulus = avg >= d.kkm ? "Lulus" : "Belum Lulus";
      return [i + 1, d.mapel, d.kkm, d.uh, d.tugas, d.mid, d.uas, avg, lulus];
    });

    doc.autoTable({
      startY: 60,
      head: [["No", "Mapel", "KKM", "UH", "Tugas", "MID", "UAS", "Rata2", "Status"]],
      body: tableData,
    });

    doc.text(`Rata-rata nilai keseluruhan: ${rataRata}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Jumlah mapel belum lulus: ${belumLulus}`, 14, doc.lastAutoTable.finalY + 17);
    doc.text("Sistem E-Rapor © 2025", 14, doc.lastAutoTable.finalY + 30);

    doc.save(`Rapot_${siswa.nama.replace(" ", "_")}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar title="Dashboard Siswa" nama={siswa.nama} onLogout={onLogout} />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white py-10 px-6 shadow-md">
        <h1 className="text-3xl font-bold">Selamat Datang, {siswa.nama} 👋</h1>
        <p className="text-sm mt-2 opacity-90">
          Kelas {siswa.kelas} | {siswa.jk}
        </p>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6 -mt-8">
        {/* Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            🧾 Informasi Siswa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <p><strong>Nama:</strong> {siswa.nama}</p>
            <p><strong>Kelas:</strong> {siswa.kelas}</p>
            <p><strong>Jenis Kelamin:</strong> {siswa.jk}</p>
            <p><strong>Wali Murid:</strong> {siswa.waliMurid}</p>
            <p><strong>Wali Kelas:</strong> {siswa.waliKelas}</p>
            <p><strong>Username:</strong> {siswa.username}</p>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
            <GraduationCap size={40} className="mb-2" />
            <h3 className="text-lg font-semibold">Rata-rata Nilai</h3>
            <p className="text-3xl font-bold mt-1">{rataRata}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
            <BookOpen size={40} className="mb-2" />
            <h3 className="text-lg font-semibold">Jumlah Mapel</h3>
            <p className="text-3xl font-bold mt-1">{dataPelajaran.length}</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
            <FileDown size={40} className="mb-2" />
            <h3 className="text-lg font-semibold">Belum Lulus</h3>
            <p className="text-3xl font-bold mt-1">{belumLulus}</p>
          </div>
        </div>

        {/* Tabel Nilai */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              📚 Rekap Nilai Pelajaran
            </h2>
            <button
              onClick={handleCetakRapot}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2"
            >
              <FileDown size={18} /> Cetak PDF
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  {["No", "Mata Pelajaran", "KKM", "UH", "Tugas", "MID", "UAS", "Rata-rata", "Status"].map(
                    (head, i) => (
                      <th key={i} className="px-4 py-2 border">{head}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {dataPelajaran.map((d, i) => {
                  const avg = ((d.uh + d.tugas + d.mid + d.uas) / 4).toFixed(1);
                  const lulus = avg >= d.kkm;
                  return (
                    <tr
                      key={i}
                      className={`${
                        lulus ? "bg-green-50" : "bg-red-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-2 text-center border">{i + 1}</td>
                      <td className="px-4 py-2 border">{d.mapel}</td>
                      <td className="px-4 py-2 text-center border">{d.kkm}</td>
                      <td className="px-4 py-2 text-center border">{d.uh}</td>
                      <td className="px-4 py-2 text-center border">{d.tugas}</td>
                      <td className="px-4 py-2 text-center border">{d.mid}</td>
                      <td className="px-4 py-2 text-center border">{d.uas}</td>
                      <td className="px-4 py-2 text-center border">{avg}</td>
                      <td
                        className={`px-4 py-2 text-center border font-semibold ${
                          lulus ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {lulus ? "Lulus" : "Belum Lulus"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 p-6 mt-8 border-t">
        © 2025 <strong>Nama Sekolah Anda</strong> — Sistem E-Rapor Siswa
      </footer>
    </div>
  );
}
