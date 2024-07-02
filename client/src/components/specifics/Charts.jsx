import React from 'react'
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
} from "chart.js";
import { getLast7Days } from '../../lib/features';


ChartJS.register(Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,)

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            // display: false,
        },
        y: {
            grid: {
                display: false,
            },
            // display: false,
        },
    },
};

const labels = getLast7Days();


const LineChart = ({ value = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Revenue",
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };
    return (
        <Line data={data} options={lineChartOptions} />
    )
}

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    }
}

const DoghnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Total Chats vs Group Chats",
                backgroundColor: ['blue', 'orange'],
                borderColor: ['blue', 'orange'],
            },
        ],
    };
    return <Doughnut data={data} options={doughnutChartOptions}/>;
}

export { LineChart, DoghnutChart };