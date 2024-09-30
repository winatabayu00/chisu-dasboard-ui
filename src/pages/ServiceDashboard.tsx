import React, { useEffect, useState } from "react";
import SelectOption from '../components/field/SelectOption.tsx';
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import { apiUrl } from "../helpers/helpers";
import axios from "axios";
import FilteredBarChart from "../components/FilteredBarChart.tsx";

const ServiceDashboard: React.FC = () => {

    const [startDate, setStartDate] = useState('01/01/2024');
    const [endDate, setEndDate] = useState('01/31/2024');
    const [barChartData, setBarChartData] = useState({
        series: [{ name: 'Target', data: [] }],
        categories: [],
    });

    const [barChartDataPuskesmas, setBarChartDataPuskesmas] = useState({
        series: [{ name: 'Target', data: [] }],
        categories: [],
    });

    const [selectedSasaran, setSelectedSasaran] = useState("");

    const handleSasaranChange = (sasaran: string) => {
        setSelectedSasaran(sasaran);
    };

    useEffect(() => {
        const fetchBarChartDataPuskesmas = async () => {
            try {
                const url = apiUrl('/data/sasaran-puskesmas-terlayani');
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const data = result.payload.data;
                    const counts = data.map((item: { count: number }) => item.count);
                    const name = data.map((item: { name: string }) => item.name);

                    setBarChartDataPuskesmas({
                        series: [{ name: 'Target', data: counts }],
                        categories: name,
                    });
                }
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        const fetchBarChartData = async () => {
            try {
                const url = apiUrl('/data/sasaran-terlayani');
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const data = result.payload.data;
                    const counts = data.map((item: { count: number }) => item.count);
                    const months = data.map((item: { month: string }) => item.month);

                    setBarChartData({
                        series: [{ name: 'Target', data: counts }],
                        categories: months,
                    });
                }
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };
        fetchBarChartDataPuskesmas();
        fetchBarChartData();
    }, []);

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        console.log('Start Date:', start);
        console.log('End Date:', end);
        // Fetch data or do other operations here based on the new dates
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <DateRangeFilter
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        onDateChange={handleDateChange}
                    />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <OptionHeaderDashboard />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <Grid />

                    <FilteredBarChart prefix="/data/sasaran-terlayani" defaultStartDate={startDate} defaultEndDate={endDate} barChartColor="#47BDF9"/>

                    <FilteredBarChart prefix="/data/sasaran-puskesmas-terlayani" defaultStartDate={startDate} defaultEndDate={endDate} barChartColor="#A77FE9"/>

                    {/*<div className="bg-white p-4 rounded-lg shadow-md mb-6">*/}
                    {/*    <FilterSection />*/}
                    {/*    <div className="flex justify-center">*/}
                    {/*        <BarChart series={barChartDataPuskesmas.series} categories={barChartDataPuskesmas.categories} colors="#A77FE9" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </main>
            </div>
        </div>
    );

    function Grid() {
        const data = [
            { text: 'Total Sasaran', value: '0', svgColor: '#FA5A7D', cardColor: '#FFE2E5' },
            { text: 'Total Sasaran Terlayani', value: '0', svgColor: '#FF947A', cardColor: '#FFF4DE' },
            { text: 'Total Kunjungan', value: '0', svgColor: '#4CB77E', cardColor: '#E5FFF1' },
        ];

        return (
            <div className="grid grid-cols-3 gap-1 mb-5">
                {data.map((item, index) => (
                    <div key={index} className={`p-6 bg-white border border-gray-200 rounded-lg shadow`} style={{backgroundColor: `${item.cardColor}`}}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill={item.svgColor} />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 11C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11H13ZM16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21V25C14 25.5523 14.4477 26 15 26C15.5523 26 16 25.5523 16 25V21ZM20 17C20.5523 17 21 17.4477 21 18V25C21 25.5523 20.5523 26 20 26C19.4477 26 19 25.5523 19 25V18C19 17.4477 19.4477 17 20 17ZM26 15C26 14.4477 25.5523 14 25 14C24.4477 14 24 14.4477 24 15V25C24 25.5523 24.4477 26 25 26C25.5523 26 26 25.5523 26 25V15Z"
                                fill="white"
                            />
                        </svg>
                        <p className="text-lg font-medium text-gray-900">{item.text}</p>
                        <p className="text-lg font-medium text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>
        );
    }
};
export default ServiceDashboard;
