import { useEffect, useState } from "react";
import SelectOption from '../field/SelectOption.tsx';
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../helpers/helpers";
import axios from 'axios';

function OptionHeaderDashboard({onOptionsChange}) {
    const location = useLocation();
    const gridCols = location.pathname === '/dilp/service-dashboard' ? 'grid-cols-5' : 'grid-cols-4';

    // State for dependencies
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedPuskesmas, setSelectedPuskesmas] = useState("");
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(""); // State for selected Sasaran

    const [selectedSasaran, setSelectedSasaran] = useState(""); // State for selected Sasaran

    const [selectedLayanan, setSelectedLayanan] = useState(""); // State for selected Sasaran

   useEffect(() => {
        onOptionsChange({
            kecamatan: selectedKecamatan,
            puskesmas: selectedPuskesmas,
            sub_district: selectedSubDistrict,
            sasaran: selectedSasaran,
            layanan: selectedLayanan

        });
    }, [selectedKecamatan, selectedPuskesmas,selectedSubDistrict, selectedSasaran,selectedLayanan]);

    return (
        <div className={`grid ${gridCols} gap-4 mb-6 mt-4`}>
            <OptionField 
                label="Kecamatan" 
                endpoint="/select-option/districts" 
                onChange={setSelectedKecamatan} // Pass selected value
                type="district" // Specify type for kecamatan
            />
            <OptionField 
                label="Puskesmas" 
                endpoint="/select-option/health-centers" 
                dependency={selectedKecamatan} // Puskesmas depends on selected Kecamatan
                onChange={setSelectedPuskesmas} // Pass selected value
                type="health_center" // Specify type for puskesmas
            />
                <OptionField 
                label="Desa / Kelurahan" 
                endpoint="/select-option/sub-districts" 
                endpoint={`/select-option/sub-districts?type=${selectedPuskesmas ? "health_center" : "district"}&type_id=${selectedPuskesmas || selectedKecamatan}`} // Update endpoint with selected target
                isDependent 
                onChange={setSelectedSubDistrict} // Pass selected value

                dependency={selectedPuskesmas || selectedKecamatan} // Desa/Kelurahan depends on selected Puskesmas or Kecamatan
                type="health_center" // Specify type for Desa/Kelurahan
            />
            <OptionField 
                label="Jenis Kelamin" 
                endpoint="/select-option/genders" 
                type="gender" // Specify type for gender
            />
            {location.pathname === '/dilp/service-dashboard' && (
                <>
                    <OptionField 
                        label="Sasaran" 
                        endpoint="/select-option/targets" 
                        onChange={setSelectedSasaran} // Update state on Sasaran change
                        type="target" // Specify type for target
                    />
                    <OptionField 
                        label="Layanan" 
                        endpoint={`/select-option/services?target=${selectedSasaran}`} // Update endpoint with selected target
                        type="service" // Specify type for layanan
                        isDependent // Mark as dependent on Sasaran
                        onChange={setSelectedLayanan} // Update state on Sasaran change
                        dependency={setSelectedSasaran} // Pass selected Sasaran as dependency
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
            if (isDependent && !dependency) return; // Don't fetch if dependency is required and not available

            console.log("health_center", type);



            try {
                const url = isDependent && dependency
                    ? apiUrl(endpoint) // Use base endpoint directly, as dependency already included in OptionField
                    : apiUrl(endpoint); // Always include type in the API request
                const response = await axios.get(url);
                console.log("response", response.data.payload);

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
const OptionField = ({ label, endpoint, isDependent = false, dependency = null, onChange, type = null }) => {
    const [selected, setSelected] = useState("");
    const [options] = useFetchOptions(endpoint, isDependent, dependency, type);

    const handleSelectChange = (value) => {
        setSelected(value);
        if (onChange) onChange(value); // Call the passed onChange function if it exists
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
