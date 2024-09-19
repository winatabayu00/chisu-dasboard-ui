import {useState} from "react";

function SidebarDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');

    return (
             <aside className="shadow-md">
                <div className="p-6">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" alt="Logo" className="mr-2" />
                        <span className="text-lg font-bold text-red-600">ILP MOJOKERTO</span>
                    </div>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li className="px-4 py-2 text-blue-600 bg-gray-200 rounded-md">
                            <i className="fas fa-tachometer-alt mr-2"></i> Dashboard Utama
                        </li>
                        <li className="px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200 rounded-md">
                            <i className="fas fa-heartbeat mr-2"></i> Dashboard Morbilitas
                        </li>
                        <li className="px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200 rounded-md">
                            <i className="fas fa-concierge-bell mr-2"></i> Dashboard Layanan
                        </li>
                    </ul>
                </nav>
           {/*     <div className="absolute bottom-0 w-full">
                    <button className="flex items-center text-red-600">
                        <i className="fas fa-sign-out-alt mr-2"></i> Keluar
                    </button>
                </div>*/}
            </aside>
    );
}

export default SidebarDashboard;