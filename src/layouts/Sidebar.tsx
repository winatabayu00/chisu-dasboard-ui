import React, { useState } from 'react';
import logo from "../assets/images/dinkes-kota-logo.png";
import smallLogo from "../assets/images/dinkes-kota-logo.png"; // Add a smaller version of the logo
import left from "../assets/images/left.png";
import right from "../assets/images/left.png"; // Use the right icon correctly for expanding
import dashboard from "../assets/images/dashboard.png"; // Use the right icon correctly for expanding
import user from "../assets/images/User.png"; // Use the right icon correctly for expanding
import documents from "../assets/images/document.png"; // Use the right icon correctly for expanding

import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <>
 
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 h-screen bg-[#FFFFFF] transition-width duration-300 ${
                    isMinimized ? 'w-25' : 'w-64'
                }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <img
                            src={isMinimized ? smallLogo : logo}
                            alt="Logo"
                            className={`${isMinimized ? 'w-10 h-10' : 'mr-2'}`} // Adjust size when minimized
                        />
                        {!isMinimized && (
                            <div className="text-lg font-bold text-red-600">
                                <span className="text-[#00B1E4]">ILP KOTA</span>
                                <br />
                                <span>MOJOKERTO</span>
                            </div>
                        )}

                        {/* Icon to minimize sidebar */}
                        <img
                            src={isMinimized ? right : left}
                            alt="Toggle Sidebar"
                            className={`cursor-pointer transition-transform duration-300 ${isMinimized ? 'ml-0' : 'ml-6'} ${isMinimized ? 'w-6 h-6' : 'w-8 h-8'}`}
                            onClick={toggleSidebar}
                        />
                    </div>

                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
                        <li>

                            <NavLink
                                to="/dilp/"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg group ${
                                        isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                                    } ${isMinimized ? 'justify-center' : ''}`
                                }
                            >
                              <img
                            src={isMinimized ? dashboard : dashboard}
                            alt="Dashboard Utama"
                            className={`${isMinimized ? 'w-5 h-5' : 'mr-2'}`} // Adjust size when minimized
                        />
                                {!isMinimized && <span className="ml-3">Dashboard Utama</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dilp/morbiditas-dashboard"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg group ${
                                        isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                                    } ${isMinimized ? 'justify-center' : ''}`
                                }
                            >
                                <img
                                    src={isMinimized ? user : user}
                                    alt="Dashboard Mordibitas"
                                    className={`${isMinimized ? 'w-5 h-5' : 'mr-2'}`} // Adjust size when minimized
                                />
                                {!isMinimized && <span className="ml-3">Dashboard Morbiditas</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dilp/service-dashboard"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg group ${
                                        isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                                    } ${isMinimized ? 'justify-center' : ''}`
                                }
                            >
                             <img
                                    src={isMinimized ? documents : documents}
                                    alt="Dashboard Layanan"
                                    className={`${isMinimized ? 'w-5 h-5' : 'mr-2'}`} // Adjust size when minimized
                                />
                                {!isMinimized && <span className="ml-3">Dashboard Layanan</span>}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Content of the page will stay unaffected */}
            <div className="ml-0">
                {/* Your main content here */}
            </div>
        </>
    );
};

export default Sidebar;
