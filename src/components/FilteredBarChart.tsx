import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import SelectOption from '../components/field/SelectOption';
import axios from 'axios';
import { apiUrl } from '../helpers/helpers';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
}

const FilteredBarChart: React.FC = () => {
    const [barChartData, setBarChartData] = useState<BarChartProps>({
        series: [{ name: 'Target', data: [] }],
        categories: [],
        colors: "#47BDF9",
    });

    const [filter, setFilter] = useState('Mingguan');
    const [sasaran, setSasaran] = useState('');
    const [sasaranOptions, setSasaranOptions] = useState([{ value: "", label: "Pilih Sasaran" }]);

    useEffect(() => {
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

    const fetchBarChartData = async (selectedFilter: string, selectedSasaran: string) => {
        try {
            const url = apiUrl(`/data/sasaran-terlayani?filter=${selectedFilter}&sasaran=${selectedSasaran}`);
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
        fetchBarChartData(filter, sasaran);
    }, [filter, sasaran]);

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    const handleSasaranChange = (value: string) => {
        setSasaran(value);
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
                    <button
                        className={`ml-2 px-4 py-2 rounded-md ${filter === 'Kumulatif' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Kumulatif')}
                    >
                        Kumulatif
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 rounded-md ${filter === 'Persentase' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Persentase')}
                    >
                        Persentase
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <SelectOption
                        options={sasaranOptions}
                        defaultValue=""
                        onChange={(e) => handleSasaranChange(e.target.value)}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
