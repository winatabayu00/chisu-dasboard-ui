import React, {useEffect, useState} from "react";
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import FilteredBarChart from "../components/FilteredBarChart.tsx";

const ServiceDashboard: React.FC = () => {
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [filters, setFilters] = useState({
        kecamatan: '',
        puskesmas: '',
        sub_district: '',
        sasaran: '',
        layanan: ''

    });

    const handleOptionsChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-full">
                <main className="flex-1 p-6">
                    <DateRangeFilter
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        onDateChange={handleDateChange}
                    />
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <OptionHeaderDashboard onOptionsChange={handleOptionsChange}/>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <FilteredBarChart
                            prefix="/data/sasaran-terlayani"
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                            filters={filters}  // passing filters as props
                            barChartColor="#47BDF9"
                            tampilAkumulatifButton={true}

                        />
                        <FilteredBarChart
                            prefix="/data/sasaran-puskesmas-terlayani"
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                            filters={filters}  // passing filters as props
                            barChartColor="#A77FE9"
                            tampilAkumulatifButton={false}
                        />
                    </div>
                </main>
            </div>
            <div className="flex justify-center">
                <a href="#"
                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Untuk Detail Lebih Lanjut Klik Disini
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ServiceDashboard;
