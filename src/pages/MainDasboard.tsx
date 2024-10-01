import React, {useEffect, useState} from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter";
import {apiUrl} from "../helpers/helpers";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard";
import FilteredBarChartUtama from "../components/FilteredBarChartUtama";
import DonutChart from "../components/DonutChart";
import TableComponent from "../components/TableComponent";
import SasaranTerlayaniOption from "../components/SasaranTerlayaniOption";
import axios from "axios";

const Dashboard: React.FC = () => {
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [noDataMessage, setNoDataMessage] = useState('');

    const [donutData, setDonutData] = useState({
        seriesPenduduk: [0, 0],
        seriesTerlayani: [0, 0],
    });
    const [setBarChartData] = useState({
        series: [{name: 'Target', data: []}],
        categories: [],
    });
    const [sasaran, setSasaran] = useState(""); // Track selected Sasaran
    const [tableData, setTableData] = useState([]);

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

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        const fetchDonutData = async () => {
            try {
                const url = apiUrl('/data/peoples');
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const {male: malePenduduk, female: femalePenduduk} = result.payload.data.series_penduduk;
                    const {male: maleTerlayani, female: femaleTerlayani} = result.payload.data.series_terlayani;

                    setDonutData({
                        seriesPenduduk: [malePenduduk, femalePenduduk],
                        seriesTerlayani: [maleTerlayani, femaleTerlayani],
                    });
                }
            } catch (error) {
                console.error('Error fetching donut data:', error);
            }
        };

        const fetchBarChartData = async (sasaran, aggregate) => {
            try {
                const url = apiUrl(`/data/total-terlayani?target=${sasaran}&aggregate=${aggregate}`);
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const data = result.payload.data;
                    const counts = data.map((item: { count: number }) => item.count);
                    const months = data.map((item: { month: string }) => item.month);

                    setBarChartData({
                        series: [{name: 'Target', data: counts}],
                        categories: months,
                    });
                }
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };


        const fetchTableData = async (sasaran) => {
            // Check if sasaran is empty or undefined
            // if (!sasaran) {
            //     setNoDataMessage('Data tidak ditemukan. Mohon pilih sasaran.');
            //     setTableData([]); // Clear any previous table data
            //     return; // Exit the function early
            // }

            try {
                const url = apiUrl(`/data/list-kunjungan?target=${sasaran}`);
                const response = await axios.get(url);
                const result = response.data;

                // Validate the response structure and check if data exists
                if (result.rc === 'SUCCESS' && result.payload && result.payload.data) {
                    const data = result.payload.data.results;

                    // Check if the results array is empty
                    console.log("data total ",data.length);
                    if (Array.isArray(data) && data.length === 0) {
                                 setNoDataMessage('Data tidak ditemukan.'); // Set message if no data is found
                   
                    } else {
                        // Clear the message if data is found
                        setNoDataMessage('');
                        const formattedTableData = data.map((item: {
                            name: string,
                            population: number,
                            served: number
                        }) => ({
                            name: item.name,
                            population: item.target_total,
                            served: item.service_total,
                        }));

                        setTableData(formattedTableData);
                        fetchBarChartData(sasaran, 'absolute'); // Fetch aggregate data based on the selected option
                    }
                } else {
                    // Handle cases where the response is not successful
                    setNoDataMessage('Terjadi kesalahan saat mengambil data.'); // Set error message
                    setTableData([]); // Clear the table data
                }
            } catch (error) {
                console.error('Error fetching table data:', error);
                 setNoDataMessage('Data tidak ditemukan.'); // Set message if no data is found
                // setNoDataMessage('Terjadi kesalahan saat mengambil data.'); // Set error message
                setTableData([]); // Clear the table data
            }
        };




        fetchDonutData();
        // fetchBarChartData(sasaran, '');
        fetchTableData(sasaran);

    }, [sasaran]); // Dependency on sasaran

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6 headers">
                    <DateRangeFilter
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        onDateChange={handleDateChange}
                    />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                    <OptionHeaderDashboard onOptionsChange={handleOptionsChange}/>

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DonutChart title="JUMLAH PENDUDUK" series={donutData.seriesPenduduk} colour="#8FFACC"/>
                        <DonutChart title="JUMLAH TERLAYANI" series={donutData.seriesTerlayani} colour="#FFD4D4"/>
                    </div>

                    <SasaranTerlayaniOption onSasaranChange={handleSasaranChange} onSasaran={setSasaran} />

                    <div className="grid grid-cols-2 gap-4">
                        <TableComponent data={tableData} message={noDataMessage}/>

                            <FilteredBarChartUtama
                                prefix={`/data/total-terlayani`}
                                defaultStartDate={startDate}
                                defaultEndDate={endDate}
                                filters={filters} // Passing the updated filters
                                barChartColor="#47BDF9"
                            />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
