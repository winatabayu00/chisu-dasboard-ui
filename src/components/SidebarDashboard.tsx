import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import logo from '../assets/images/dinkes-kota-logo.png';

function SidebarDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');
    const location = useLocation(); // Mengambil informasi rute saat ini

    return (
        <aside className="shadow-md">
            <div className="p-6">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="mr-2"/>
                    <div className="text-lg font-bold text-red-600">
                        <span className="text-[#00B1E4]">
                             ILP KOTA
                        </span>
                        <br/>
                        <span>
                             MOJOKERTO
                        </span>
                    </div>
                </div>
            </div>
            <nav className="mt-6">
                <ul className="d-flex">
                    <Link to="/" className="flex items-center">
                        <li className={`px-4 py-2 rounded-md ${location.pathname === "/" ? "text-blue-600 bg-gray-200" : "text-gray-600 hover:bg-gray-200"}`}>
                            <i className="fas fa-tachometer-alt mr-2"></i> Dashboard Utama
                        </li>
                    </Link>
                    <Link to="/morbilitas-dashboard" className="flex items-center">
                        <li className={`px-4 py-2 mt-2 rounded-md ${location.pathname === "/morbilitas-dashboard" ? "text-blue-600 bg-gray-200" : "text-gray-600 hover:bg-gray-200"}`}>
                            <i className="fas fa-heartbeat mr-2"></i> Dashboard Morbilitas
                        </li>
                    </Link>
                    <Link to="/service-dashboard" className="flex items-center">
                        <li className={`px-4 py-2 mt-2 rounded-md ${location.pathname === "/service-dashboard" ? "text-blue-600 bg-gray-200" : "text-gray-600 hover:bg-gray-200"}`}>
                            <i className="fas fa-concierge-bell mr-2"></i> Dashboard Layanan
                        </li>
                    </Link>

                </ul>
            </nav>
            {/* <div className="absolute bottom-0 w-full">
                <button className="flex items-center text-red-600">
                    <i className="fas fa-sign-out-alt mr-2"></i> Keluar
                </button>
            </div> */}
        </aside>
    );
}

export default SidebarDashboard;
