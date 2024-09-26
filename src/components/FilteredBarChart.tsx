import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import SelectOption from '../components/field/SelectOption';
import axios from 'axios';
import { apiUrl } from '../helpers/helpers';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
}


// Define the interface for props
interface DateRangeFilterProps {
  defaultStartDate?: string;
  defaultEndDate?: string;
}


const FilteredBarChart: React.FC<DateRangeFilterProps> = ({ defaultStartDate , defaultEndDate }) => {
    const [barChartData, setBarChartData] = useState<BarChartProps>({
        series: [{ name: 'Target', data: [] }],
        categories: [],
        colors: "#47BDF9",
    });

    const [filter, setFilter] = useState('Mingguan');
    const [sasaran, setSasaran] = useState('');
    const [sasaranOptions, setSasaranOptions] = useState([{ value: "", label: "Pilih Sasaran" }]);
    const [layanan, setLayanan] = useState('');
    const [layananOptions, setLayananOptions] = useState([{ value: "", label: "Pilih Layanan" }]);

    useEffect(() => {
        // Fetching Sasaran Options
        const fetchSasaranOptions = async () => {
            try {
                const url = apiUrl('/select-option/targets');
                const response = await axios.get(url);
                const data = response.data.payload.data;

                const options = data.map((item: { id: string; name: string }) => ({
                    value: item.id,
                    label: item.name
                }));
                setSasaranOptions([{ value: "", label: "Pilih Sasaran" }, ...options]);
            } catch (error) {
                console.error('Error fetching sasaran options:', error);
            }
        };

        fetchSasaranOptions();
    }, []);

    // Fetching Layanan Options based on Sasaran
    useEffect(() => {
        const fetchLayananOptions = async () => {
            if (!sasaran) return;
            try {
                const url = apiUrl(`/select-option/services?target=${sasaran}`);
                const response = await axios.get(url);
                const data = response.data.payload.data;

                const options = data.map((item: { id: string; name: string }) => ({
                    value: item.id,
                    label: item.name
                }));
                setLayananOptions([{ value: "", label: "Pilih Layanan" }, ...options]);
            } catch (error) {
                console.error('Error fetching layanan options:', error);
            }
        };

        fetchLayananOptions();
    }, [sasaran]);

    const fetchBarChartData = async (selectedFilter: string, selectedSasaran: string, selectedLayanan: string) => {
        console.log("defaultStartDate", defaultStartDate);
        console.log("defaultEndDate", defaultEndDate);

        try {
            const url = apiUrl(`/data/sasaran-terlayani?period[type]=${selectedFilter}&period[start]=${defaultStartDate}&period[end]=${defaultEndDate}&aggregate=${selectedSasaran}&indicator=${selectedLayanan}`);
            const response = await axios.get(url);
            const result = response.data;

            if (result.rc === 'SUCCESS') {
                const data = result.payload.data;
                const counts = data.map((item: { count: number }) => item.count);
                const categories = data.map((item: { month: string }) => item.month);

                setBarChartData({
                    series: [{ name: 'Target', data: counts }],
                    categories: categories,
                    colors: "#47BDF9",
                });
            }
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    useEffect(() => {
        fetchBarChartData(filter, sasaran, layanan);
    }, [filter, sasaran, layanan]);

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    const handleSasaranChange = (value: string) => {
        setSasaran(value);
        setLayanan(''); // Reset layanan when sasaran changes
    };

    const handleLayananChange = (value: string) => {
        setLayanan(value);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'Mingguan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Mingguan')}
                    >
                        Mingguan
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 rounded-md ${filter === 'Bulanan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Bulanan')}
                    >
                        Bulanan
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 rounded-md ${filter === 'Tahunan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Tahunan')}
                    >
                        Tahunan
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Sasaran Select */}
                    <SelectOption
                        options={sasaranOptions}
                        defaultValue=""
                        onChange={(e) => handleSasaranChange(e.target.value)}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {/* Layanan Select */}
                    <SelectOption
                        options={layananOptions}
                        defaultValue=""
                        onChange={(e) => handleLayananChange(e.target.value)}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled={!sasaran} // Disable if no sasaran is selected
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <BarChart series={barChartData.series} categories={barChartData.categories} colors={barChartData.colors} />
            </div>
        </div>
    );
};

export default FilteredBarChart;
