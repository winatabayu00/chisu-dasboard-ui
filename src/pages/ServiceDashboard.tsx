import React, { useEffect, useState } from "react";
import SelectOption from '../components/field/SelectOption.tsx';
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import BarChart from "../components/BarChart.tsx";
import { apiUrl } from "../helpers/helpers";
import axios from "axios";

const ServiceDashboard: React.FC = () => {
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

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <DateRangeFilter />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <OptionHeaderDashboard />

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                    <Grid />

                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 mt-6">
                        <FilterSection />
                        <div className="flex justify-center">
                            <BarChart series={barChartData.series} categories={barChartData.categories} colors="#47BDF9" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <FilterSection />
                        <div className="flex justify-center">
                            <BarChart series={barChartDataPuskesmas.series} categories={barChartDataPuskesmas.categories} colors="#A77FE9" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

    function FilterSection() {
        return (
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
                    <SemuaSasaran onSasaranChange={handleSasaranChange} />
                    <SemuaLayanan selectedSasaran={selectedSasaran} />
                </div>
            </div>
        );
    }

    function SemuaSasaran({ onSasaranChange }) {
        const [selected, setSelected] = useState("");
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
                    console.error("Error fetching sasaran options", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (option: any) => {
            setSelected(option || "");
            onSasaranChange(option || "");
        };

        return (
            <div>
                <h1>Pilih Sasaran</h1>
                <SelectOption
                    options={options}
                    value={selected}
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

    function SemuaLayanan({ selectedSasaran }) {
        const [selected, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Layanan" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const url = apiUrl(`/select-option/services?target=${selectedSasaran}`);
                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Layanan" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching layanan options", error);
                }
            };

            fetchData();
        }, [selectedSasaran]);

        const handleSelectChange = (option: any) => {
            setSelected(option || "");
        };

        return (
            <div>
                <h1>Pilih Layanan</h1>
                <SelectOption
                    options={options}
                    value={selected}
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

    function Grid() {
        const data = [
            { text: 'Total Sasaran', value: '0', svgColor: '#FA5A7D', cardColor: 'bg-[#FFE2E5]' },
            { text: 'Total Sasaran Terlayani', value: '0', svgColor: '#FF947A', cardColor: 'bg-[#FFF4DE]' },
            { text: 'Total Kunjungan', value: '0', svgColor: '#4CB77E', cardColor: 'bg-[#E5FFF1]' },
        ];

        return (
            <div className="grid grid-cols-3 gap-1">
                {data.map((item, index) => (
                    <div key={index} className={`p-6 bg-white border border-gray-200 rounded-lg shadow ${item.cardColor}`}>
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
