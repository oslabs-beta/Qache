import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const state = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: ' ms',
      fill: false,
      lineTension: 0.35,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [645, 272, 80, 81, 80, 79],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Cache Speed',
    },
    legend: {
      display: false,
    },
  },
};

const LineGraph = () => {
  return (
    <div>
      <Line width={500} height={400} data={state} options={options} />
    </div>
  );
};

export default LineGraph;
