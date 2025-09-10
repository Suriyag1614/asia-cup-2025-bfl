import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ rowData, singleColumn }) => {
  if (!rowData || rowData.length === 0) return null;

  const columns = singleColumn ? [singleColumn] : Object.keys(rowData[0]);

  return (
    <div style={{ marginTop: '40px' }}>
      {columns.map(col => {
        const labels = [];
        const data = [];
        const firstValue = rowData[0][col];

        if (typeof firstValue === 'number') {
          rowData.forEach(r => {
            labels.push(r.Name || r.Team || ''); 
            data.push(r[col]);
          });
        } else {
          const counts = {};
          rowData.forEach(r => {
            const val = r[col] || 'N/A';
            counts[val] = (counts[val] || 0) + 1;
          });
          Object.keys(counts).forEach(key => {
            labels.push(key);
            data.push(counts[key]);
          });
        }

        const chartData = {
          labels,
          datasets: [
            {
              label: col,
              data,
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        };

        return (
          <div key={col} style={{ marginBottom: '40px' }}>
            <h3>{col}</h3>
            <Bar data={chartData} />
          </div>
        );
      })}
    </div>
  );
};

export default ChartComponent;
