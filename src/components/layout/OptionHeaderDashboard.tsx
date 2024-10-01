import { useEffect, useState } from "react";
import SelectOption from '../field/SelectOption.tsx';
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../helpers/helpers";
import axios from 'axios';

function OptionHeaderDashboard({ onOptionsChange }) {
    const location = useLocation();
    const gridCols = location.pathname === '/dilp/service-dashboard' ? 'grid-cols-5' : 'grid-cols-4';

    // State for dependencies
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedPuskesmas, setSelectedPuskesmas] = useState("");
    const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
    const [selectedSasaran, setSelectedSasaran] = useState(location.pathname === '/dilp/service-dashboard' ? "usia_dewasa" : ""); // Default value
    const [selectedLayanan, setSelectedLayanan] = useState(location.pathname === '/dilp/service-dashboard' ? "pasien_hipertensi" : ""); // Default value

    useEffect(() => {
        onOptionsChange({
            kecamatan: selectedKecamatan,
            puskesmas: selectedPuskesmas,
            sub_district: selectedSubDistrict,
            sasaran: selectedSasaran,
            layanan: selectedLayanan
        });
    }, [selectedKecamatan, selectedPuskesmas, selectedSubDistrict, selectedSasaran, selectedLayanan]);

    return (
        <div className={`grid ${gridCols} gap-4 mb-6 mt-4`}>
            <OptionField
                label="Kecamatan"
                endpoint="/select-option/districts"
                onChange={setSelectedKecamatan}
                type="district"
            />
            <OptionField
                label="Puskesmas"
                endpoint="/select-option/health-centers"
                dependency={selectedKecamatan}
                onChange={setSelectedPuskesmas}
                type="health_center"
            />
            <OptionField
                label="Desa / Kelurahan"
                endpoint={`/select-option/sub-districts?type=${selectedPuskesmas ? "health_center" : "district"}&type_id=${selectedPuskesmas || selectedKecamatan}`}
                isDependent
                onChange={setSelectedSubDistrict}
                dependency={selectedPuskesmas || selectedKecamatan}
                type="health_center"
            />
            <OptionField
                label="Jenis Kelamin"
                endpoint="/select-option/genders"
                type="gender"
            />
            {location.pathname === '/dilp/service-dashboard' && (
                <>
                    <OptionField
                        label="Sasaran"
                        endpoint="/select-option/targets"
                        onChange={setSelectedSasaran}
                        type="target"
                        defaultValue={selectedSasaran} // Set default value
                    />
                    <OptionField
                        label="Layanan"
                        endpoint={`/select-option/services?target=${selectedSasaran}`}
                        type="service"
                        isDependent
                        onChange={setSelectedLayanan}
                        dependency={selectedSasaran}
                        defaultValue={selectedLayanan} // Set default value
                    />
                </>
            )}
        </div>
    );
}

// Custom hook to handle fetching options from API
const useFetchOptions = (endpoint, isDependent = false, dependency = null, type = null) => {
    const [options, setOptions] = useState([{ value: "", label: `Pilih Salah Satu` }]);

    useEffect(() => {
        const fetchOptions = async () => {
            if (isDependent && !dependency) return;

            try {
                const url = apiUrl(endpoint);
                const response = await axios.get(url);
                const data = response.data.payload.data;
                const mappedOptions = data.map(item => ({
                    value: item.id,
                    label: item.name,
                }));
                setOptions([{ value: "", label: `Pilih Salah Satu` }, ...mappedOptions]);
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        };

        fetchOptions();
    }, [endpoint, isDependent, dependency, type]);

    return [options, setOptions];
};

// Reusable OptionField component for select dropdowns
const OptionField = ({ label, endpoint, isDependent = false, dependency = null, onChange, defaultValue = "", type = null }) => {
    const [selected, setSelected] = useState(defaultValue); // Initialize selected with defaultValue
    const [options] = useFetchOptions(endpoint, isDependent, dependency, type);

    // Set selected value if the default value matches any option
    useEffect(() => {
        const matchingOption = options.find(option => option.value === defaultValue);
        console.log("matchingOption" , matchingOption);
        if (matchingOption) {
            setSelected(matchingOption.value);
        } else {
            setSelected(""); // Reset if no match
        }
    }, [options, defaultValue]);

    const handleSelectChange = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <SelectOption
                options={options}
                value={selected} // Use selected value
                onChange={handleSelectChange}
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
};

export default OptionHeaderDashboard; 
