import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
}

const BarChart: React.FC<BarChartProps> = ({ series, categories }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-center">
            <Chart
                series={series}
                type="bar"
                height={350}
                width={800}
                options={{
                    chart: { type: 'bar', height: 350 },
                    plotOptions: {
                        bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
                    },
                    xaxis: { categories },
                    yaxis: { title: { text: 'Jumlah' } },
                    tooltip: {
                        y: { formatter: (val: number) => `${val} layanan` }
                    }
                }}
            />
        </div>
    </div>
);

export default BarChart;
