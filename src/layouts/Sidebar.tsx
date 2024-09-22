import React from 'react';
import logo from "../assets/images/dinkes-kota-logo.png";
import {NavLink} from 'react-router-dom';

const Sidebar: React.FC = () => (
    <aside id="default-sidebar"
           className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
           aria-label="Sidebar">

        <div className="h-full px-3 py-4 overflow-y-auto bg-[#FFFFFF]">

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

            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <li>
                    <NavLink to="/" className={({isActive}) =>
                        `flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                            isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                        }`}
                    >

                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.33334 6.66671H4.66668C6.00001 6.66671 6.66668 6.00004 6.66668 4.66671V3.33337C6.66668 2.00004 6.00001 1.33337 4.66668 1.33337H3.33334C2.00001 1.33337 1.33334 2.00004 1.33334 3.33337V4.66671C1.33334 6.00004 2.00001 6.66671 3.33334 6.66671Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"/>
                            <path
                                d="M11.3333 6.66671H12.6667C14 6.66671 14.6667 6.00004 14.6667 4.66671V3.33337C14.6667 2.00004 14 1.33337 12.6667 1.33337H11.3333C10 1.33337 9.33334 2.00004 9.33334 3.33337V4.66671C9.33334 6.00004 10 6.66671 11.3333 6.66671Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"/>
                            <path
                                d="M11.3333 14.6667H12.6667C14 14.6667 14.6667 14 14.6667 12.6667V11.3334C14.6667 10 14 9.33337 12.6667 9.33337H11.3333C10 9.33337 9.33334 10 9.33334 11.3334V12.6667C9.33334 14 10 14.6667 11.3333 14.6667Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"/>
                            <path
                                d="M3.33334 14.6667H4.66668C6.00001 14.6667 6.66668 14 6.66668 12.6667V11.3334C6.66668 10 6.00001 9.33337 4.66668 9.33337H3.33334C2.00001 9.33337 1.33334 10 1.33334 11.3334V12.6667C1.33334 14 2.00001 14.6667 3.33334 14.6667Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                stroke-linejoin="round"/>
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">Dashboard Utama</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/morbiditas-dashboard" className={({isActive}) =>
                        `flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                            isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                        }`}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.99999 8.00004C9.84094 8.00004 11.3333 6.50766 11.3333 4.66671C11.3333 2.82576 9.84094 1.33337 7.99999 1.33337C6.15904 1.33337 4.66666 2.82576 4.66666 4.66671C4.66666 6.50766 6.15904 8.00004 7.99999 8.00004Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path
                                d="M13.7267 14.6667C13.7267 12.0867 11.16 10 8.00001 10C4.84001 10 2.27335 12.0867 2.27335 14.6667"
                                stroke="#6F8299" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">Dashboard Morbiditas</span>
                    </NavLink>

                </li>
                <li>
                    <NavLink to="/service-dashboard" className={({isActive}) =>
                        `flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                            isActive ? 'bg-[#122B4C] text-white' : 'text-gray-500'
                        }`}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6667 6.66671V10C14.6667 13.3334 13.3334 14.6667 10 14.6667H6.00004C2.66671 14.6667 1.33337 13.3334 1.33337 10V6.00004C1.33337 2.66671 2.66671 1.33337 6.00004 1.33337H9.33337"
                                stroke="#6F8299" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path
                                d="M14.6667 6.66671H12C10 6.66671 9.33337 6.00004 9.33337 4.00004V1.33337L14.6667 6.66671Z"
                                stroke="#6F8299" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.66663 8.66663H8.66663" stroke="#6F8299" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.66663 11.3334H7.33329" stroke="#6F8299" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <span className="flex-1 ms-3 whitespace-nowrap">Dashboard Layanan</span>
                    </NavLink>

                </li>
            </ul>
        </div>
    </aside>
);

export default Sidebar;
