import { useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import SidebarDashboard from '../components/SidebarDashboard.tsx';
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import HeaderDashboard from "../components/HeaderDashboard.tsx";

function MorbiditasDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');
    const [startDate, setStartDate] = useState('01/01/2024');
    const [endDate, setEndDate] = useState('01/01/2024');
    
    // Data for the treemap
    const data = [
        { name: 'Diseases of the circulatory system', value: 3000000 },
        { name: 'Diseases of the respiratory system', value: 3000000 },
        { name: 'Diseases of the digestive system', value: 3000000 },
        { name: 'Diseases of the musculoskeletal system', value: 3000000 },
        { name: 'Endocrine, nutritional and metabolic diseases', value: 3000000 },
        { name: 'Symptom and abnormal clinical findings', value: 3000000 },
    ];

    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            series: [
                {
                    type: 'treemap',
                    data: data,
                    label: {
                        show: true,
                        formatter: '{b}\n{c}',
                        fontSize: 14,
                        color: '#fff',
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2,
                        gapWidth: 2,
                    },
                    levels: [
                        {
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 2,
                                gapWidth: 2,
                            },
                        },
                    ],
                },
            ],
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div className="flex h-screen">
            <SidebarDashboard />
            <main className="flex-1 p-6">
                {/* Header Section */}
                <HeaderDashboard />

                <DateRangeFilter />

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <OptionHeaderDashboard />

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* ECharts Treemap Section */}
                <div className="w-full h-96">
                    <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
                </div>
            </main>
        </div>
    );
}

export default MorbiditasDashboard;
