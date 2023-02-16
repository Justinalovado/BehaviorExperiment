import React from 'react'
import { Bar, Line } from "react-chartjs-2"
import Chart from 'chart.js/auto';

const Barchart = ({ values, label }) => {
  console.log(values, label)
  const data = {
    labels: label,
    datasets: [
      {
        label: "Metrics",
        data: values,
        backgroundColor: "rgba(153, 102, 255,0.4)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio:2,
    scales:{
      y : {min:0, max:100}
    }

  }

	return (
    <div className="bar-chart">
      <Bar data={data} options={options} />
    </div>
  );
}
export default Barchart;