import { useState } from "react";
import SidebarDashboard from './SidebarDashboard.tsx';

function ServiceDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');


    return (
        <div className="flex h-screen">
            <SidebarDashboard/>
            <main className="flex-1 p-6 overflow-auto">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Dashboard Layanan</h2>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <label className="block text-sm font-medium text-gray-700">Range Tanggal</label>
                            <div className="relative mt-1">
                                <input type="text" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md" />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-calendar-alt text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-2"/>
                            <div>
                                <h3 className="text-sm font-medium">Karna Habibi</h3>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-5 gap-4 mb-6">
                    {/* Filter Dropdowns */}
                    {["Kecamatan", "Puskesmas", "Desa/Kelurahan", "Jenis Kelamin", "Klaster"].map((label, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700">{label}</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>Pilih {label}</option>
                            </select>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { color: 'pink', label: 'Total Sasaran' },
                        { color: 'yellow', label: 'Total Sasaran Terlayani' },
                        { color: 'green', label: 'Total Kunjungan' },
                    ].map(({ color, label }, index) => (
                        <div key={index} className={`bg-${color}-100 p-4 rounded-lg shadow`}>
                            <div className="flex items-center">
                                <i className={`fas fa-chart-bar text-${color}-500 text-2xl mr-2`}></i>
                                <div>
                                    <h3 className="text-2xl font-bold">0</h3>
                                    <p className="text-sm text-gray-600">{label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md">FILTER</button>
                            <button className="bg-blue-600 text-white px-4 py-2">MINGGUAN</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2">BULANAN</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2">ABSOLUT</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md">KUMULATIF</button>
                        </div>
                        <div className="flex items-center">
                            <select className="mr-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>Sasaran Ibu Hamil</option>
                            </select>
                            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>Semua Layanan</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Jumlah Sasaran Terlayani</h3>
                        <div className="relative">
                            <img src="https://placehold.co/600x300" alt="Bar chart" className="w-full"/>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded">
                                <p>April 2022</p>
                                <p>Absolut: 10000</p>
                                <p>Kumulatif: 90000</p>
                                <p>Presentase: 50%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ServiceDashboard;
