import {useState} from "react";

const DateRangeFilter = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        if (onDateChange) {
            onDateChange(e.target.value, endDate);
        }
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        if (onDateChange) {
            onDateChange(startDate, e.target.value);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
