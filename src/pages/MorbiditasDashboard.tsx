import React, { useEffect, useRef, useState } from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard.tsx";
import * as echarts from "echarts";
import { apiUrl } from "../helpers/helpers.ts";
import axios from "axios";

const Dashboard: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null); // Reference to the chart container
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-01-31');
    const [morbiditasData, setMorbiditasData] = useState([]); // State for treemap data


      const [filters, setFilters] = useState({
        kecamatan: '',
        puskesmas: '',
        sub_district: '',
        sasaran: '',
        layanan: ''

    });

   const handleOptionsChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    const handleSasaranChange = (sasaran: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sasaran  // Update only the sasaran in the filters object
        }));
    };

    // Function to handle date range changes
    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    // Fetch morbiditas data when startDate or endDate changes
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

                    // Map data to match treemap requirements
                    const mappedData = data.map((item: { name: string, count: number }) => ({
                        name: item.name,
                        value: item.count
                    }));

                    setMorbiditasData(mappedData); // Save mapped data to state
                }
            } catch (error) {
                console.error('Error fetching morbiditas data:', error);
            }
        };
        fetchMorbiditas();
    }, [startDate, endDate]); // Refetch data when the date range changes

    // Initialize and update the ECharts treemap when morbiditasData is available
    useEffect(() => {
        if (chartRef.current && morbiditasData.length > 0) {
            const chartInstance = echarts.init(chartRef.current);

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}' // Format for tooltip
                },
                series: [
                    {
                        type: 'treemap',
                        data: morbiditasData, // Data for treemap
                        label: {
                            show: true,
                            formatter: '{b}\n{c}', // Display name and value in the chart
                            fontSize: 14,
                            color: '#fff', // Label color
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 2,
                            gapWidth: 2, // Style for treemap items
                        },
                        levels: [
                            {
                                itemStyle: {
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                    gapWidth: 2, // Level style
                                },
                            },
                        ],
                    },
                ],
            };

            chartInstance.setOption(option);

            // Resize chart on window resize
            const handleResize = () => {
                chartInstance.resize();
            };

            window.addEventListener('resize', handleResize);

            // Clean up
            return () => {
                window.removeEventListener('resize', handleResize);
                chartInstance.dispose(); // Dispose of chart on unmount
            };
        }
    }, [morbiditasData]); // Update chart when data changes

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
                    <OptionHeaderDashboard onOptionsChange={handleOptionsChange} />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* ECharts Treemap Section */}
                    <div className="w-full h-full">
                        <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
