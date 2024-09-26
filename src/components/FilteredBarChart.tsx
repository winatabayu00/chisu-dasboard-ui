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

    const [filterDate, setFilterDate] = useState('Mingguan');
    const [filter, setFilter] = useState('Absolut');
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
        fetchBarChartData(filterDate, filter, sasaran);
    }, [filterDate, filter, sasaran]);

    const handleFilterChangeDate = (selectedFilter: string) => {
        setFilterDate(selectedFilter);
    };

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };


    const [selectedSasaran, setSelectedSasaran] = useState("");

    const handleSasaranChange = (sasaran: string) => {
        setSelectedSasaran(sasaran);
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        className={`px-4 py-2 rounded-md ${filterDate === 'Mingguan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('Mingguan')}
                    >
                        Mingguan
                    </button>

                    <button
                        className={`px-4 py-2 rounded-md ${filterDate === 'Bulanan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('Bulanan')}
                    >
                        Bulanan
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filterDate === 'Tahunan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('Tahunan')}
                    >
                        Tahunan
                    </button>
                </div>

                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'Absolut' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Absolut')}
                    >
                        Absolut
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'Kumulatif' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Kumulatif')}
                    >
                        Kumulatif
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${filter === 'Persentase' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChange('Persentase')}
                    >
                        Persentase
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <SemuaSasaran onSasaranChange={handleSasaranChange} />
                    <SemuaLayanan selectedSasaran={selectedSasaran} />
                </div>
            </div>

            <div className="flex justify-center">
                <BarChart series={barChartData.series} categories={barChartData.categories}
                          colors={barChartData.colors}/>
            </div>
        </div>
    );

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
};

export default FilteredBarChart;
