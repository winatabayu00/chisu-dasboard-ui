import React, { useEffect, useState } from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter";
import { apiUrl } from "../helpers/helpers";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard";
import FilteredBarChart from "../components/FilteredBarChart";
import DonutChart from "../components/DonutChart";
import TableComponent from "../components/TableComponent";
import SelectOption from "../components/field/SelectOption";
import SasaranTerlayaniOption from "../components/SasaranTerlayaniOption";
import axios from "axios";

const Dashboard: React.FC = () => {
    const [startDate, setStartDate] = useState('01/01/2024');
    const [endDate, setEndDate] = useState('01/31/2024');
    const [donutData, setDonutData] = useState({
        seriesPenduduk: [0, 0],
        seriesTerlayani: [0, 0],
    });
    const [barChartData, setBarChartData] = useState({
        series: [{ name: 'Target', data: [] }],
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
        setFilters(newFilters);
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
                        series: [{ name: 'Target', data: counts }],
                        categories: months,
                    });
                }
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        const fetchTableData = async (sasaran) => {
            try {
                const url = apiUrl(`/data/list-kunjungan?target=${sasaran}`);
                const response = await axios.get(url);
                const result = response.data;

                if (result.rc === 'SUCCESS') {
                    const data = result.payload.data.results;
                    const formattedTableData = data.map((item: { name: string, population: number, served: number }) => ({
                        name: item.name,
                        population: item.target_total,
                        served: item.service_total,
                    }));

                    setTableData(formattedTableData);
                    fetchBarChartData(sasaran, null); // ambil aggregate dari pilihan absolute, cumulateive , percentage
                }
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchDonutData();
        // fetchBarChartData(sasaran);
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

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <OptionHeaderDashboard onOptionsChange={handleOptionsChange} />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DonutChart title="JUMLAH PENDUDUK" series={donutData.seriesPenduduk} colour="#8FFACC" />
                        <DonutChart title="JUMLAH TERLAYANI" series={donutData.seriesTerlayani} colour="#FFD4D4" />
                    </div>

                    <SasaranTerlayaniOption onSasaranChange={setSasaran} />

                    <div className="grid grid-cols-2 gap-4">
                        <TableComponent data={tableData} />
                        <FilteredBarChart
                            prefix="/data/total-terlayani"
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                            filters={filters}  // passing filters as props
                            barChartColor="#47BDF9"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
