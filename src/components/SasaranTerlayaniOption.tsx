import React, { useEffect, useState } from 'react';
import SelectOption from '../components/field/SelectOption';
import axios from 'axios';
import { apiUrl } from '../helpers/helpers';

interface SasaranTerlayaniOptionProps {
    onSasaranChange: (value: string) => void; // Prop to pass the selected Sasaran back to the parent
    onSasaran: (value: string) => void; // Prop to pass the selected Sasaran back to the parent

}

const SasaranTerlayaniOption: React.FC<SasaranTerlayaniOptionProps> = ({ onSasaranChange , onSasaran }) => {
    const [selected, setSelected] = useState<string>("");
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

    const handleSelectChange = (value: string) => {
        console.log("Selected option:", value);
        setSelected(value || "");
        onSasaranChange(value || ""); // Pass the selected value to the parent
        onSasaran(value || ""); // Pass the selected value to the parent

    };

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <SelectOption
                options={sasaranOptions}
                value={selected}
                onChange={handleSelectChange} // Pass the selected value
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
};

export default SasaranTerlayaniOption;
