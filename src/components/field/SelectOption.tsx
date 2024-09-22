import {useState} from "react";

const SelectOption = ({options, onChange, defaultValue, className}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (onChange) {
            onChange(value); // Pass the selected value to parent component
        }
    };

    return (
        <select
            value={selectedOption}
            onChange={handleSelectChange}
            className={className}
        >
            {options && options.length > 0 ? (
                options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))
            ) : (
                <option value="">No options available</option>
            )}
        </select>
    );
};

export default SelectOption;
