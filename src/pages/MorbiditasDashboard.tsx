import React, {useEffect, useRef, useState} from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard.tsx";
import * as echarts from "echarts";
import {apiUrl} from "../helpers/helpers.ts";
import axios from "axios";

const Dashboard: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-01-31');

    const [morbiditasData, setMorbiditasData] = useState([]); // state untuk data treemap

    // Function to handle date range changes from DateRangeFilter
    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    // Fetching data when startDate or endDate changes
    useEffect(() => {
        const fetchMorbiditas = async () => {
            try {
                const url = apiUrl('/data/morbiditas');
                const response = await axios.get(url, {
                    params: {
                        start_date: startDate,
                        end_date: endDate
                    }
                });
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const data = result.payload.data;

                    // Mapping the data into the structure required for treemap
                    const mappedData = data.map((item: { name: string, count: number }) => ({
                        name: item.name,
                        value: item.count
                    }));

                    setMorbiditasData(mappedData); // Simpan data yang sudah di-mapping
                }
            } catch (error) {
                console.error('Error fetching morbiditas data:', error);
            }
        };
        fetchMorbiditas();
    }, [startDate, endDate]); // Re-fetch data whenever the date range changes

    useEffect(() => {
        if (chartRef.current && morbiditasData.length > 0) {
            const chartInstance = echarts.init(chartRef.current);

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}'
                },
                series: [
                    {
                        type: 'treemap',
                        data: morbiditasData,
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

            const handleResize = () => {
                chartInstance.resize();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chartInstance.dispose();
            };
        }
    }, [morbiditasData]);


    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    {/* Date range filter */}
                    <DateRangeFilter
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        onDateChange={handleDateChange}
                    />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* Options header */}
                    <OptionHeaderDashboard />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* ECharts Treemap Section */}
                    <div className="w-full h-96">
                        <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
