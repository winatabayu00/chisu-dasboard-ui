import { useState } from "react";
import SidebarDashboard from '../components/SidebarDashboard.tsx';
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import HeaderDashboard from "../components/HeaderDashboard.tsx";

function MorbiditasDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');
    const [startDate, setStartDate] = useState('01/01/2024');
    const [endDate, setEndDate] = useState('01/01/2024');

    const data = [
        { id: 1, text: 'Diseases of the circulatory system', value: '3.000.000', color: 'bg-teal-500' },
        { id: 2, text: 'Diseases of the respiratory system', value: '3.000.000', color: 'bg-teal-400' },
        { id: 3, text: 'Diseases of the digestive system', value: '3.000.000', color: 'bg-teal-300' },
        { id: 4, text: 'Diseases of the musculoskeletal system', value: '3.000.000', color: 'bg-teal-200' },
        { id: 5, text: 'Endocrine, nutritional and metabolic diseases', value: '3.000.000', color: 'bg-teal-100' },
        { id: 6, text: 'Symptom and abnormal clinical findings', value: '3.000.000', color: 'bg-teal-50' },
    ];

    return (
        <div className="flex h-screen">
            <SidebarDashboard />
            <main className="flex-1 p-6">
                {/* Header Section */}
                <HeaderDashboard/>

                <DateRangeFilter/>

                {/* Filters Section */}
                <OptionHeaderDashboard/>

                {/* Dashboard Section */}
                <div className="grid grid-cols-4 gap-4">
                    {data.map((item) => (
                        <div key={item.id} className={`p-4 text-white ${item.color} rounded-lg shadow-md`}>
                            <div className="text-sm font-semibold">#{item.id}. {item.text}</div>
                            <div className="text-lg font-bold">{item.value}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MorbiditasDashboard;
