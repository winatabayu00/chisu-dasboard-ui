// DonutChart.tsx
import React from 'react';
import Chart from "react-apexcharts";

interface DonutChartProps {
    title: string;
    series: number[];
    colour: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ title, series, colour }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        labels: ['Laki-Laki', 'Wanita'],
        colors: ['#00E396', '#F4607A'],
        legend: {
            position: 'bottom',
        },
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 style={{backgroundColor: `${colour}`}}
                className="text-lg font-bold text-center text-black-600 py-2 rounded-t-lg">
                {title}
            </h2>
            <div className="flex justify-center my-4">
                <Chart
                    series={series}
                    options={options}
                    type="pie"
                    width="280"
                />
            </div>
        </div>
    );
};

export default DonutChart;
