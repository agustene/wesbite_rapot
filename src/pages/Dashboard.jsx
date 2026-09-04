import React, { useState } from 'react';
import GradeForm from '../components/GradeForm';
import Rekap from './Rekap';

export default function Dashboard() {
  const [data, setData] = useState([]);

  const addGrade = (item) => setData([...data, item]);

  return (
    <div className="p-4 space-y-6">
      <GradeForm onAdd={addGrade} />
      <Rekap data={data} />
    </div>
  );
}
