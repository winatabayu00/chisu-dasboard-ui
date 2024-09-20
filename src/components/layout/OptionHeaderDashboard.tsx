import {useState} from "react";
import SelectOption from '../field/SelectOption.tsx'

function OptionHeaderDashboard() {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <DistrictOption/>
            <SubDistrictOption/>
            <HealthCenterOption/>
            <GenderOption/>
        </div>
    );

    function DistrictOption() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Pilih Kecamatan"},
            {value: "kecamatan1", label: "Kecamatan 1"},
            {value: "kecamatan2", label: "Kecamatan 2"},
            {value: "kecamatan3", label: "Kecamatan 3"}
        ];

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
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>Selected Option: {selected}</p>
            </div>
        );
    }

    function GenderOption() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Pilih Jenis Kelamin"},
            {value: "male", label: "Laki laki"},
            {value: "female", label: "Perempuan"},
        ];

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
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>Selected Option: {selected}</p>
            </div>
        );
    }


    function HealthCenterOption() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Pilih Puskesmas"},
            {value: "healt_center1", label: "Puskesnas 1"},
            {value: "healt_center2", label: "Puskesnas 2"},
            {value: "healt_center3", label: "Puskesnas 3"}
        ];

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
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>Selected Option: {selected}</p>
            </div>
        );
    }

    function SubDistrictOption() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Pilih Desa / Kelurahan"},
            {value: "sub_district_1", label: "Desa / Kelurahan 1"},
            {value: "sub_district_2", label: "Desa / Kelurahan 2"},
            {value: "sub_district_3", label: "Desa / Kelurahan 3"}
        ];

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
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p>Selected Option: {selected}</p>
            </div>
        );
    }
}

export default OptionHeaderDashboard;
