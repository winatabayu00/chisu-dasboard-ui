import { useState } from "react";

// Interface for props
interface SelectOptionParams {
  options: { value: string; label: string }[];  
  defaultValue?: string;  
  onChange: (value: string) => void; 
  className?: string;  
}

// Functional component definition with typed props
const SelectOption: React.FC<SelectOptionParams> = ({ options, onChange, defaultValue = "", className }) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  // Event handler for select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);  // Pass the selected value to parent component
    }
  };

  // console.log("Selected Value ", selectedOption);
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
