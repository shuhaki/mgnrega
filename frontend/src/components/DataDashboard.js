import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DataDashboard({ district }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (district) {
      fetchData();
    }
  }, [district]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/data/district/${district}`);
      const districtData = await response.json();
      setData(districtData);
    } catch (error) {
      console.error('Error fetching district data:', error);
    }
  };

  if (data.length === 0) {
    return <div className="chart-container">Loading data...</div>;
  }

  const years = data.map(item => item.fin_year);
  const jobcards = data.map(item => item.total_jobcards);
  const workers = data.map(item => item.total_workers);

  const lineChartData = {
    labels: years,
    datasets: [
      {
        label: 'Total JobCards Issued',
        data: jobcards,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Total Workers',
        data: workers,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: years,
    datasets: [
      {
        label: 'JobCards vs Workers',
        data: jobcards.map((jc, i) => jc - workers[i]),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `MGNREGA Performance for ${district}`,
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <h3>Trend Over Years</h3>
        <Line data={lineChartData} options={options} />
      </div>
      <div className="chart-container">
        <h3>JobCards vs Workers Gap</h3>
        <Bar data={barChartData} options={options} />
      </div>
      <div className="chart-container">
        <h3>Latest Data ({data[data.length - 1]?.fin_year})</h3>
        <p>Total JobCards: {data[data.length - 1]?.total_jobcards}</p>
        <p>Total Workers: {data[data.length - 1]?.total_workers}</p>
      </div>
    </div>
  );
}

export default DataDashboard;
