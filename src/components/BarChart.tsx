import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
}

const BarChart: React.FC<BarChartProps> = ({ series, categories, colors }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">

        <p className="flex justify-center text-lg font-bold">The quick brown fox ...</p>

        <div className="flex justify-center">
            <Chart
                series={series}
                type="bar"
                height={350}
                width={800}
                options={{
                    chart: {type: 'bar', height: 350},
                    plotOptions: {
                        bar: {horizontal: false, columnWidth: '55%', endingShape: 'rounded'}
                    },
                    xaxis: {categories},

                    yaxis: {title: {text: 'Jumlah'}},
                    tooltip: {
                        y: {formatter: (val: number) => `${val} layanan`}
                    },
                    colors: [colors],
                }}
            />
        </div>
    </div>
);

export default BarChart;
