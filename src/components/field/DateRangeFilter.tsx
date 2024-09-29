import { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Define the interface for props
interface DateRangeFilterProps {
  defaultStartDate?: string;
  defaultEndDate?: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ defaultStartDate, defaultEndDate, onDateChange }) => {
  const dateRangeRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);

  const updateDateRange = (startDate: Date, endDate: Date) => {
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
    setSelectedRange([startDateString, endDateString]);
    onDateChange(startDateString, endDateString);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    setIsCustom(option === 'custom');

    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = today;

    switch (option) {
      case 'tahun-ini':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'setahun-terakhir':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'enam-bulan-terakhir':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        break;
      case 'tiga-bulan-terakhir':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        break;
      default:
        startDate = null;
        endDate = null;
        break;
    }

    if (startDate && endDate) {
      updateDateRange(startDate, endDate);
    }
  };

  useEffect(() => {
    // Set default dates on initial load
    const today = new Date();
    if (defaultStartDate && defaultEndDate) {
      setSelectedRange([defaultStartDate, defaultEndDate]);
      onDateChange(defaultStartDate, defaultEndDate);
    } else {
      const startDate = new Date(today.getFullYear(), 0, 1);
      const endDate = today;
      updateDateRange(startDate, endDate);
    }
  }, [defaultStartDate, defaultEndDate, onDateChange]);

  useEffect(() => {
    if (!isCustom) return;

    const rangePicker = flatpickr(dateRangeRef.current, {
      mode: 'range',
      defaultDate: selectedRange || [defaultStartDate, defaultEndDate],
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          const startDate = selectedDates[0].toISOString().split('T')[0];
          const endDate = selectedDates[1].toISOString().split('T')[0];
          setSelectedRange([startDate, endDate]);
          onDateChange(startDate, endDate);
        }
      },
    });

    return () => {
      rangePicker.destroy();
    };
  }, [isCustom, defaultStartDate, defaultEndDate, onDateChange, selectedRange]);

  return (
      <div className="flex justify-end items-center space-x-4">
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2 ">Pilih Rentang Waktu</label>
          <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="">-- Pilih Opsi --</option>
            <option value="tahun-ini">Tahun Ini</option>
            <option value="setahun-terakhir">Setahun Terakhir</option>
            <option value="enam-bulan-terakhir">6 Bulan Terakhir</option>
            <option value="tiga-bulan-terakhir">3 Bulan Terakhir</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {isCustom && (
            <div id="date-range-picker" className="mt-4 ms-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Rentang Tanggal Custom</label>
              <div className="relative">
                <div className="absolute left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                      className="mt-3 w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                    id="datepicker-range"
                    ref={dateRangeRef}
                    name="date-range"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Pilih rentang tanggal"
                />
              </div>
            </div>
        )}
      </div>
  );
};

export default DateRangeFilter;
