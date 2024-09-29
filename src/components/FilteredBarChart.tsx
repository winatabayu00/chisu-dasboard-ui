import React, {useEffect, useState} from 'react';
import BarChart from '../components/BarChart';
import SelectOption from '../components/field/SelectOption';
import axios from 'axios';
import {apiUrl} from '../helpers/helpers';
import 'flatpickr/dist/flatpickr.min.css';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
}


// Define the interface for props
interface DateRangeFilterProps {
    prefix: string;
    defaultStartDate?: string;
    defaultEndDate?: string;
    barChartColor?: string;
}


const FilteredBarChart: React.FC<DateRangeFilterProps> = ({
                                                              prefix,
                                                              defaultStartDate,
                                                              defaultEndDate,
                                                              barChartColor
                                                          }) => {
    const [barChartData, setBarChartData] = useState<BarChartProps>({
        series: [{name: 'Target', data: []}],
        categories: [],
        colors: `${barChartColor}`,
    });

    const [filterDate, setFilterDate] = useState('monthly');
    const [filter, setFilter] = useState('absolute');
    const [selected, setSelected] = useState("");
    const [sasaranOptions, setSasaranOptions] = useState([{value: "", label: "Pilih Sasaran"}]);
    const [layanan, setLayanan] = useState('');
    const [layananOptions, setLayananOptions] = useState([{value: "", label: "Pilih Layanan"}]);

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
                setSasaranOptions([{value: "", label: "Pilih Sasaran"}, ...options]);
            } catch (error) {
                console.error('Error fetching sasaran options:', error);
            }
        };

        fetchSasaranOptions();
    }, []);

    // Fetching Layanan Options based on Sasaran
    useEffect(() => {
        const fetchLayananOptions = async () => {
            if (!selected) return;
            try {
                const url = apiUrl(`/select-option/services?target=${selected}`);
                const response = await axios.get(url);
                const data = response.data.payload.data;

                const options = data.map((item: { id: string; name: string }) => ({
                    value: item.id,
                    label: item.name
                }));
                setLayananOptions([{value: "", label: "Pilih Layanan"}, ...options]);
            } catch (error) {
                console.error('Error fetching layanan options:', error);
            }
        };

        fetchLayananOptions();
    }, [selected]);

    const fetchBarChartData = async (filterDate: string, selectedFilter: string, selectedSasaran: string, selectedLayanan: string) => {
        try {
            const url = apiUrl(`${prefix}?period[type]=${filterDate}&period[start]=${defaultStartDate}&period[end]=${defaultEndDate}&aggregate=${selectedFilter}&target=${selectedSasaran}&indicator=${selectedLayanan}`);
            const response = await axios.get(url);
            const result = response.data;

            if (result.rc === 'SUCCESS') {
                const data = result.payload.data;
                const counts = data.map((item: { count: number }) => item.count);
                const categories = data.map((item: { name: string }) => item.name);

                setBarChartData({
                    series: [{name: 'Target', data: counts}],
                    categories: categories,
                    colors: barChartData.colors,
                });
            }
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    useEffect(() => {
        if (selected && layanan) {
            // Fetch data only if selected and layanan are not null
            fetchBarChartData(filterDate, filter, selected, layanan);
        }
    }, [filterDate, filter, selected, layanan]);

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    const handleFilterChangeDate = (selectedFilter: string) => {
        setFilterDate(selectedFilter);
    };

    const handleSelectChange = (option: any) => {
        setSelected(option || "");
    };

    const handleLayananChange = (option: any) => {
        setLayanan(option || "");
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        disabled="true"
                        className={`px-4 py-2 rounded-md ${filterDate === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('weekly')}
                    >
                        weekly
                    </button>

                    <button
                        className={`px-4 py-2 rounded-md ${filterDate === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('monthly')}
                    >
                        monthly
                    </button>
                    <button
                        disabled="true"
                        className={`px-4 py-2 rounded-md ${filterDate === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('yearly')}
                    >
                        yearly
                    </button>
                </div>

                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'absolute' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('absolute')}
                    >absolute
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'cumulative' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('cumulative')}
                    >cumulative
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'percentage' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('percentage')}
                    >percentage
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Sasaran Select */}
                    <SelectOption
                        options={sasaranOptions}
                        value={selected}
                        onChange={handleSelectChange}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {/* Layanan Select */}
                    <SelectOption
                        options={layananOptions}
                        defaultValue=""
                        onChange={handleLayananChange}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <BarChart series={barChartData.series} categories={barChartData.categories}
                          colors={barChartData.colors}/>
            </div>
        </div>
    );
};

export default FilteredBarChart;