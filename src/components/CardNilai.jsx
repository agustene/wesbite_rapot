import React from "react";

const CardNilai = ({ title, nilai }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-4xl font-bold text-blue-600 mt-2">{nilai}</p>
      <span className="text-sm text-gray-500">Rata-rata nilai</span>
    </div>
  );
};

export default CardNilai;
