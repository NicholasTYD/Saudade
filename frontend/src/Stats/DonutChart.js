import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ chartTitle, chartData }) {
    const options = {
        responsive: true,
        plugins: {
            title: {
                position: 'top',
                display: true,
                text: chartTitle,
                color: 'white',
                font: {
                    size: 20
                }
            },
            tooltip: {
                bodyColor: 'yellow',
            },
            legend: {
              labels: {
                 color: "white",
              }
           },
        },
    }

    const data = {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
          {
            data: chartData,
            backgroundColor: [
              'rgba(255, 255, 255, 0.4)',
              'rgba(40, 190, 40, 0.45)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.65)',
              'rgba(255, 159, 64, 0.7)',
            ],
            borderColor: [
              'white',
              'white',
              'white',
              'white',
              'white',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    
    return <Doughnut options={options} data={data} />;
}

export default DonutChart;