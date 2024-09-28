import React, { useEffect, useState } from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import { apiUrl } from "../helpers/helpers";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard.tsx";
import FilteredBarChart from "../components/FilteredBarChart";
import DonutChart from "../components/DonutChart";
import TableComponent from "../components/TableComponent";
import SelectOption from "../components/field/SelectOption.tsx";
import axios from "axios";

const Dashboard: React.FC = () => {
    // Example start and end dates to pass to DateRangeFilter
    const [startDate] = useState('01/01/2024');
    const [endDate] = useState('01/31/2024');

    const [donutData, setDonutData] = useState({
        seriesPenduduk: [0, 0],
        seriesTerlayani: [0, 0],
    });

    const [barChartData, setBarChartData] = useState({
        series: [{ name: 'Target', data: [] }],
        categories: [],
    });

    const tableData = [
        { name: 'Ibu Hamil', population: 4901000, served: 4000000 },
        { name: 'Ibu Bersalin/Nifas', population: 4901000, served: 4000000 },
    ];

    useEffect(() => {
        const fetchDonutData = async () => {
            try {
                const url = apiUrl('/data/peoples');
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const { male: malePenduduk, female: femalePenduduk } = result.payload.data.series_penduduk;
                    const { male: maleTerlayani, female: femaleTerlayani } = result.payload.data.series_terlayani;

                    setDonutData({
                        seriesPenduduk: [malePenduduk, femalePenduduk],
                        seriesTerlayani: [maleTerlayani, femaleTerlayani],
                    });
                }
            } catch (error) {
                console.error('Error fetching donut data:', error);
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

        fetchDonutData();
        fetchBarChartData();
    }, []);

    function SemuaSasaran() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Sasaran" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const url = apiUrl('/select-option/targets');
                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Sasaran" }, ...mappedOptions]);
                } catch (error) {
                    console.error('Error fetching options:', error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        return (
            <div>
                <h1>Pilih Sasaran</h1>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6 headers">
                    
                    {/* Pass startDate and endDate to DateRangeFilter */}
                    <DateRangeFilter defaultStartDate={startDate} defaultEndDate={endDate} />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <OptionHeaderDashboard />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DonutChart title="JUMLAH PENDUDUK" series={donutData.seriesPenduduk} colour="#8FFACC" />
                        <DonutChart title="JUMLAH TERLAYANI" series={donutData.seriesTerlayani} colour="#FFD4D4" />
                    </div>
{/*
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center me-2">
                                <i className="fas fa-filter mr-2"></i>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Persentase</button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <SemuaSasaran />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <BarChart series={barChartData.series} categories={barChartData.categories} colors="#47BDF9" />
                        </div>
                    </div>*/}

                    {/*Filter Bar Chart*/}

                           {/* Filtered Bar Chart */}
                    <FilteredBarChart prefix="/data/sasaran-terlayani" defaultStartDate={startDate} defaultEndDate={endDate} barChartColor="#47BDF9"/>

                    {/* Table */}
                    <TableComponent data={tableData} />

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
