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
        sasaran: string;
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
                start_date: defaultStartDate,
                end_date: defaultEndDate,
                kecamatan: filters.kecamatan,
                puskesmas: filters.puskesmas,
                sasaran: filters.sasaran
            };

            const response = await axios.get(url, { params });
            const result = response.data;

            if (result.rc === 'SUCCESS') {
                const data = result.payload.data;
                const counts = data.map((item: { count: number }) => item.count);
                const categories = data.map((item: { name: string }) => item.name);

                console.log("dta count ", counts);
                console.log("dta categories ", categories);

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
