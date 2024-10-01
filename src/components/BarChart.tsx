import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
    sasaranOption?: null|string;
    layananOption?: null|string;
}

const BarChart: React.FC<BarChartProps> = ({series, categories, colors,sasaranOption, layananOption}) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6" style={{ width: '100%', height: '100%' }}>

        <p className="flex justify-center text-lg font-bold">{sasaranOption} {layananOption ? `- ${layananOption}` : ''}</p>

        <div className="flex justify-center">
            <Chart
                series={series}
                type="bar"
                style={{ width: '100%', height: '100%' }}
                height={`200%`}
                width={`100%`}
                options={{
                    chart: {type: 'bar'},
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
