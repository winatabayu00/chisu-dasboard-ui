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

const FilteredBarChart: React.FC<FilteredBarChartProps> = ({
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
            aggregate: 'absolute',
            target : filters.sasaran,
            indicator: filters.layanan // Assuming a fixed indicator, you can make this dynamic if needed
        };

            const response = await axios.get(url, { params });
            const result = response.data;

            if (result.rc === 'SUCCESS') {
                const data = result.payload.data;
                const counts = data.map((item: { count: number }) => item.count);
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
        fetchBarChartData();
    }, [defaultStartDate, defaultEndDate, filters]);  // re-fetch when filters or date range changes

    return (
        <div>
            <BarChart series={barChartData.series} categories={barChartData.categories} colors={barChartData.colors} />
        </div>
    );
};

export default FilteredBarChart;
