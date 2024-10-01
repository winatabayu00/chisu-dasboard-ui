import React, {useEffect, useState} from "react";
import SelectOption from '../components/field/SelectOption.tsx';
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import {apiUrl} from "../helpers/helpers";
import axios from "axios";
import FilteredBarChart from "../components/FilteredBarChart.tsx";

const ServiceDashboard: React.FC = () => {
    const [startDate, setStartDate] = useState('01/01/2024');
    const [endDate, setEndDate] = useState('01/31/2024');
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
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <DateRangeFilter
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        onDateChange={handleDateChange}
                    />
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <OptionHeaderDashboard onOptionsChange={handleOptionsChange} />
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <FilteredBarChart
                            prefix="/data/sasaran-terlayani"
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                            filters={filters}  // passing filters as props
                            barChartColor="#47BDF9"
                        />
                        <FilteredBarChart
                            prefix="/data/sasaran-puskesmas-terlayani"
                            defaultStartDate={startDate}
                            defaultEndDate={endDate}
                            filters={filters}  // passing filters as props
                            barChartColor="#A77FE9"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ServiceDashboard;
