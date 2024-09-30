import { useEffect, useState } from "react";
import SelectOption from '../field/SelectOption.tsx';
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../helpers/helpers";
import axios from 'axios';

function OptionHeaderDashboard() {
    const location = useLocation();
    const gridCols = location.pathname === '/dilp/service-dashboard' ? 'grid-cols-5' : 'grid-cols-4';

    return (
        <div className={`grid ${gridCols} gap-4 mb-6 mt-4`}>
            <OptionField label="Kecamatan" endpoint="/select-option/districts" />
            <OptionField label="Puskesmas" endpoint="/select-option/health-centers" />
            <OptionField label="Desa / Kelurahan" endpoint="/select-option/sub-districts" isDependent />
            <OptionField label="Jenis Kelamin" endpoint="/select-option/genders" />
            {location.pathname === '/dilp/service-dashboard' && (
                <OptionField label="Sasaran" endpoint="/select-option/targets" />
            )}
        </div>
    );
}

// Custom hook to handle fetching options from API
const useFetchOptions = (endpoint, isDependent = false, dependency = null) => {
    const [options, setOptions] = useState([{ value: "", label: `Pilih ${endpoint.split('/').pop()}` }]);

    useEffect(() => {
        const fetchOptions = async () => {
            console.log("isDependent", dependency);
            if (isDependent && !dependency) return; // Don't fetch if dependency is required and not available

            try {
                const url = isDependent
                    ? apiUrl(`${endpoint}?district_code=${dependency}`)
                    : apiUrl(endpoint);
                const response = await axios.get(url);
                const data = response.data.payload.data;

                const mappedOptions = data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));
                setOptions([{ value: "", label: `Pilih ${endpoint.split('/').pop()}` }, ...mappedOptions]);
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        };

        fetchOptions();
    }, [endpoint, isDependent, dependency]);

    return [options, setOptions];
};

// Reusable OptionField component for select dropdowns
const OptionField = ({ label, endpoint, isDependent = false, dependency = null }) => {
    const [selected, setSelected] = useState("");
    const [options] = useFetchOptions(endpoint, isDependent, dependency);

    const handleSelectChange = (value) => {

        console.log("Value" , value);
        setSelected(value);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <SelectOption
                options={options}
                defaultValue=""
                onChange={handleSelectChange}
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
};

export default OptionHeaderDashboard;
