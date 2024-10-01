import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apiUrl} from '../helpers/helpers';
import BarChart from '../components/BarChart';

interface BarChartProps {
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string;
}

interface FilteredBarChartProps {
    prefix: string;
    defaultStartDate?: string;
    defaultEndDate?: string;
    barChartColor?: string;
    filters: {
        kecamatan: string;
        puskesmas: string;
        sub_district: string;
        sasaran: string;
        layanan: string;
    }; // new prop for filters
}

const FilteredBarChartUtama: React.FC<FilteredBarChartProps> = ({
    prefix,
    defaultStartDate,
    defaultEndDate,
    barChartColor,
    filters // destructuring the new filters prop
}) => {
    const [barChartData, setBarChartData] = useState<BarChartProps>({
        series: [{name: 'Target', data: []}],
        categories: [],
        colors: `${barChartColor}`,
    });

    const [filterDate, setFilterDate] = useState('monthly');
    const [aggregate, setAggregate] = useState('');  // Setting default to 'absolute'


    const fetchBarChartData = async () => {
        try {
            const url = apiUrl(`${prefix}`);
                   const params = {
            'region[district]': filters.kecamatan, // Map kecamatan to district
            'region[sub_district]':filters.sub_district , // Map puskesmas to sub_district
            'region[health_center]': filters.puskesmas, // Assuming sasaran is health_center
            'period[type]': 'monthly', // Assuming a fixed type, you can make this dynamic if needed
            'period[start]': defaultStartDate || '2023-01-01', // Use defaultStartDate or a fallback
            'period[end]': defaultEndDate || '2023-12-30', // Use defaultEndDate or a fallback
            aggregate: aggregate || 'absolute',
            target : filters.sasaran,
            indicator: filters.layanan // Assuming a fixed indicator, you can make this dynamic if needed
        };

            const response = await axios.get(url, { params });
            const result = response.data;

            if (result.rc === 'SUCCESS') {
                const data = result.payload.data.results;
                console.log("Datas ", data);
                const counts = data.map((item: { count: number }) => item.target_total);
                const categories = data.map((item: { name: string }) => item.name);

                setBarChartData({
                    series: [{name: 'Target', data: counts}],
                    categories,
                    colors: `${barChartColor}`,
                });
            }
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    useEffect(() => {
    if (!aggregate) {
        setAggregate('absolute');  // Ensure it doesn't reset to null
    }
        fetchBarChartData();
    }, [defaultStartDate, defaultEndDate, filters, aggregate]);  // re-fetch when filters or date range changes

    const handleFilterAgregate = (selectedFilter: string) => {
        console.log("selectedFilter" , selectedFilter);
        setAggregate(selectedFilter);
    };

    const handleFilterChangeDate = (selectedFilter: string) => {
        setFilterDate(selectedFilter);
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            {/* <p className="flex justify-center text-lg font-bold mb-3">Jumlah Sasaran Terlayani</p> */}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        disabled={true} hidden="hidden"
                        className={`px-4 py-2 rounded-md ${filterDate === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterChangeDate('weekly')}
                    >
                        weekly
                    </button>

                    <button hidden="hidden"
                            className={`px-4 py-2 rounded-md ${filterDate === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleFilterChangeDate('monthly')}
                    >
                        monthly
                    </button>
                    <button hidden="hidden"
                            disabled={true}
                            className={`px-4 py-2 rounded-md ${filterDate === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleFilterChangeDate('yearly')}
                    >
                        yearly
                    </button>
                </div>

                <div className="flex items-center me-2">
                    <i className="fas fa-filter mr-2"></i>
                    <button
                        className={`px-4 py-2 rounded-md ${aggregate === 'absolute' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterAgregate('absolute')}
                    >Absolut
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${aggregate === 'cumulative' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterAgregate('cumulative')}
                    >Kumulatif
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${aggregate === 'percentage' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleFilterAgregate('percentage')}
                    >Persentase
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">

                </div>
            </div>
            <div className="flex justify-center">
                <BarChart series={barChartData.series} categories={barChartData.categories}
                          colors={barChartData.colors} sasaranOption={filters.sasaran} layananOption={filters.layanan}/>
            </div>
        </div>
    );
};

export default FilteredBarChartUtama;
