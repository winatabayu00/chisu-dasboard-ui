import {useState} from "react";

function HeaderDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');

    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard Utama</h1>
            <div className="flex items-center">

                <div className="flex items-center">
                    <img src="https://placehold.co/40x40" alt="User Avatar" className="w-10 h-10 rounded-full mr-2"/>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Zeenal Waluyo</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderDashboard;
