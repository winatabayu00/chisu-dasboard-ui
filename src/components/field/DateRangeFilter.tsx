import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Define the interface for props
interface DateRangeFilterProps {
  defaultStartDate?: string;
  defaultEndDate?: string;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ defaultStartDate , defaultEndDate }) => {
  const dateRangeRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    // Initialize Flatpickr for the date range input
        const rangePicker = flatpickr(dateRangeRef.current, {
  mode: "range",
  defaultDate: [defaultStartDate, defaultEndDate],
  dateFormat: "m/d/Y",  // Sesuaikan format tanggal
  onChange: (selectedDates, dateStr) => {
    // Handle date change if needed
  },
});


    return () => {
      // Cleanup Flatpickr instance when the component is unmounted
      rangePicker.destroy();
    };
  }, [defaultStartDate, defaultEndDate]);
    console.log("Default Start Date: ", defaultStartDate);
    console.log("Default End Date: ", defaultEndDate);

  return (
    <div id="date-range-picker" className="flex items-center justify-end">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Periode</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </div>
          <input
            id="datepicker-range"
            ref={dateRangeRef}
            name="date-range"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date range"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
