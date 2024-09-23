import { useEffect, useState } from "react";
import SelectOption from '../field/SelectOption.tsx'
import { useLocation } from "react-router-dom";
import axios from 'axios';

function OptionHeaderDashboard() {
    const location = useLocation();
    const gridCols = location.pathname === '/morbiditas-dashboard' ? 'grid-cols-5' : 'grid-cols-4';

    return (
        <div className={`grid ${gridCols} gap-4 mb-6 mt-4`}>
            <DistrictOption />
            <SubDistrictOption />
            <HealthCenterOption />
            <GenderOption />
            <SasaranOption />
        </div>
    );

    function SasaranOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Sasaran" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://chisu-core.me/api/select-option/targets');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Sasaran" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
        };

        if (location.pathname === '/morbiditas-dashboard') {
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

    function DistrictOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Kecamatan" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://chisu-core.me/api/select-option/districts');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Kecamatan" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
        };

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        );
    }

    function SubDistrictOption() {
        const [, setSelected] = useState("");
        const [options, setOptions] = useState([{ value: "", label: "Pilih Desa / Kelurahan" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://chisu-core.me/api/select-option/sub-districts');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Desa / Kelurahan" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
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
                    const response = await axios.get('http://chisu-core.me/api/select-option/health-centers');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Puskesmas" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
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
        const [options, setOptions] = useState([{ value: "", label: "Pilih Puskesmas" }]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://chisu-core.me/api/select-option/genders');
                    const data = response.data.payload.data;

                    const mappedOptions = data.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    setOptions([{ value: "", label: "Pilih Puskesmas" }, ...mappedOptions]);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
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
