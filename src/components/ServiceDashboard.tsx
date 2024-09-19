import {useState} from "react";

function ServiceDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');

    return (
        <div className="flex">
            <aside className="w-64 bg-white h-screen shadow-md">
                <div className="p-4 flex items-center">
                    <img src="https://placehold.co/50x50" alt="Logo" className="mr-2"/>
                    <div>
                        <h1 className="text-lg font-bold">ILP KOTA MOJOKERTO</h1>
                    </div>
                </div>
                <nav className="mt-10">
                    <a href="#" className="flex items-center p-4 text-gray-600 hover:bg-gray-200">
                        <i className="fas fa-tachometer-alt mr-3"></i>
                        Dashboard Utama
                    </a>
                    <a href="#" className="flex items-center p-4 text-gray-600 hover:bg-gray-200">
                        <i className="fas fa-heartbeat mr-3"></i>
                        Dashboard Morbiditas
                    </a>
                    <a href="#" className="flex items-center p-4 text-white bg-blue-600">
                        <i className="fas fa-chart-bar mr-3"></i>
                        Dashboard Layanan
                    </a>
                </nav>
                <div className="absolute bottom-0 w-full p-4">
                    <a href="#" className="flex items-center text-red-600">
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Keluar
                    </a>
                </div>
            </aside>
            <main className="flex-1 p-6">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Pilih Kecamatan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Puskesmas</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Pilih Puskesmas</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Desa/Kelurahan</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Pilih Desa/Kelurahan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Semua Jenis Kelamin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Klaster</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Klaster 2</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-pink-100 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <i className="fas fa-chart-bar text-pink-500 text-2xl mr-2"></i>
                            <div>
                                <h3 className="text-2xl font-bold">0</h3>
                                <p className="text-sm text-gray-600">Total Sasaran</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <i className="fas fa-chart-bar text-yellow-500 text-2xl mr-2"></i>
                            <div>
                                <h3 className="text-2xl font-bold">0</h3>
                                <p className="text-sm text-gray-600">Total Sasaran Terlayani</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <i className="fas fa-chart-bar text-green-500 text-2xl mr-2"></i>
                            <div>
                                <h3 className="text-2xl font-bold">0</h3>
                                <p className="text-sm text-gray-600">Total Kunjungan</p>
                            </div>
                        </div>
                    </div>
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
                            <img src="https://placehold.co/600x300" alt="Bar chart showing data for each month" className="w-full"/>
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
