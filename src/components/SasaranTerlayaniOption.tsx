import React, {useEffect, useState} from 'react';
import SelectOption from '../components/field/SelectOption';
import axios from 'axios';
import {apiUrl} from '../helpers/helpers';
import 'flatpickr/dist/flatpickr.min.css';

const FilteredBarChart: React.FC = () => {

    const [selected, setSelected] = useState<string>("");
    const [sasaranOptions, setSasaranOptions] = useState([{value: "", label: "Pilih Sasaran"}]);
    const [layanan, setLayanan] = useState<string>('');
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

    const handleSelectChange = (option: {value: string}) => {
        setSelected(option?.value || "");
    };

    const handleLayananChange = (option: {value: string}) => {
        setLayanan(option?.value || "");
    };

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Sasaran Select */}
            <SelectOption
                options={sasaranOptions}
                value={selected}
                onChange={handleSelectChange}
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {/* Layanan Select */}
            {/*<SelectOption
                options={layananOptions}
                value={layanan}
                onChange={handleLayananChange}
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />*/}
        </div>
    );
};

export default FilteredBarChart;
