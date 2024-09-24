import SelectOption from "./SelectOption.tsx";
import {useState} from "react";

function SemuaSasaran() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Semua Sasaran"},
            {value: "sasaran1", label: "Sasaran 1"},
            {value: "sasaran2", label: "Sasaran 2"},
            {value: "sasaran3", label: "Sasaran 3"}
        ];

        const handleSelectChange = (value: string) => {
            setSelected(value);
        };

        return (
            <div>
                <h1>&nbsp;</h1>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                />

            </div>
        );
    }

    export default SemuaSasaran;