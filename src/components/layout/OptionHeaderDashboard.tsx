import { useEffect, useState } from "react";
import SelectOption from '../field/SelectOption.tsx'
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../helpers/helpers";
import axios from 'axios';

function OptionHeaderDashboard() {
    const location = useLocation();
    const gridCols = location.pathname === '/dilp/service-dashboard' ? 'grid-cols-6' : 'grid-cols-4';

    return (
        <div className={`grid ${gridCols} gap-4 mb-6 mt-4`}>
            <DistrictOption />
            <HealthCenterOption />
            <SubDistrictOption />
            <GenderOption />
            <SasaranOption />
            <LayananOption />
        </div>
    );

    function SasaranOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Sasaran" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {

                    const url = apiUrl('/select-option/targets'); // Pass the API endpoint


                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Sasaran" }, ...mappedOptions]);
                } catch (error) {
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        if (location.pathname === '/dilp/service-dashboard') {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sasaran</label>
                    <SelectOption
                        options={options}
                        defaultValue=""
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
            );
        }

        return <div></div>;
    }

    function LayananOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Layanan" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const url = apiUrl('/select-option/services'); // Pass the API endpoint

                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Layanan" }, ...mappedOptions]);
                } catch (error) {
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        if (location.pathname === '/dilp/service-dashboard') {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Layanan</label>
                    <SelectOption
                        options={options}
                        defaultValue=""
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
            );
        }

        return <div></div>;
    }

    function DistrictOption() {
        const [selected, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Kecamatan" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const url = apiUrl('/select-option/districts'); // Pass the API endpoint
                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Kecamatan" }, ...mappedOptions]);
                } catch (error) {
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

function SubDistrictOption({ selectedDistrict }) {
    const [options, setOptions] = useState([{ value: "", label: "Pilih Desa / Kelurahan" }]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDistrict) {
                try {
                    const url = apiUrl(`/select-option/sub-districts?district_code=${selectedDistrict}`);
                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Desa / Kelurahan" }, ...mappedOptions]);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [selectedDistrict]);

    const handleSelectChange = (value) => {
        console.log("Selected Subdistrict:", value); // Instead of using state
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Desa / Kelurahan</label>
            <SelectOption
                options={options}
                defaultValue=""
                onChange={(e) => handleSelectChange(e.target.value)}
                className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
}

    function HealthCenterOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Puskesmas" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                       const url = apiUrl('/select-option/health-centers'); // Pass the API endpoint
                    const response = await axios.get(url);
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Puskesmas" }, ...mappedOptions]);
                } catch (error) {
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">Puskesmas</label>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

    function GenderOption() {
        const [, setSelected] = useState("");
            const [options, setOptions] = useState([{ value: "", label: "Pilih Jenis Kelamin" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                        const url = apiUrl('/select-option/genders'); // Pass the API endpoint
                    const response = await axios.get(url);
                    // const response = await axios.get('http://chisu-core.me/api/select-option/');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Jenis Kelamin" }, ...mappedOptions]);
                } catch (error) {
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
        };

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }
}

export default OptionHeaderDashboard;