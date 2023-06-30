import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

function LineChart({ chartTitle, months, chartData, average }) {
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
                display: false
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'gray',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'gray',
                },
            },
        },
    };
    
    const labels = months;
    const data = {
        labels,
        datasets: [
            {
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'white',
            },
            {
                data: Array.from({ length: months.length }, () => average),
                borderColor: 'rgba(255, 255, 255, 0.75)',
                backgroundColor: 'grey',
            },
        ],
    };

    return <Line options={options} data={data} />;
}

export default LineChart;