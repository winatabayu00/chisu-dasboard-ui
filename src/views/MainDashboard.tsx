import {useState} from "react";
import SidebarDashboard from '../components/SidebarDashboard.tsx';
import Chart from "react-apexcharts";

function MainDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');

   // Data for Donut Charts
    const donutData = {
        seriesPenduduk: [50, 50],  // Example data for male/female population
        seriesTerlayani: [45, 55], // Example data for male/female served
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Laki-Laki', 'Wanita'],
            colors: ['#00E396', '#F4607A'],
            legend: {
                position: 'bottom',
            },
        },
    };

    // Data for Bar Chart
    const barChartData = {
        series: [
            {
                name: 'Target',
                data: [10, 25, 30, 40, 50]  // Example monthly targets
            },
            {
                name: 'Terlayani',
                data: [5, 20, 25, 35, 45]   // Example monthly actuals
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            },
            yaxis: {
                title: {
                    text: 'Jumlah'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return `${val} layanan`;
                    }
                }
            }
        }
    };
    return (
        <div className="flex w-screen">
                <SidebarDashboard/>

            <main className="flex-1 p-6 headers">

                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard Utama</h1>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <label className="block text-sm font-medium text-gray-700">Range Tanggal</label>
                            <input type="text" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        </div>
                        <div className="flex items-center">
                            <img src="https://placehold.co/40x40" alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Zeenal Waluyo</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-4 gap-4 mb-6">
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
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-center text-green-600">JUMLAH PENDUDUK</h2>
                        <div className="flex justify-center my-4">
                            {/*<img src="https://placehold.co/100x100" alt="Pie chart showing population distribution" />*/}
                             <Chart 
                                options={donutData.options} 
                                series={donutData.seriesPenduduk} 
                                type="donut" 
                                width="280" 
                            />
                        </div>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <p className="text-green-600"><i className="fas fa-male"></i> Laki-Laki</p>
                                <p>130.000.000 (50%)</p>
                            </div>
                            <div className="text-center">
                                <p className="text-pink-600"><i className="fas fa-female"></i> Wanita</p>
                                <p>130.000.000 (50%)</p>
                            </div>
                        </div>
                        <p className="text-center mt-4">Total: 6.000.000</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-center text-pink-600">JUMLAH TERLAYANI</h2>
                        <div className="flex justify-center my-4">
                                <Chart 
                                options={donutData.options} 
                                series={donutData.seriesTerlayani} 
                                type="donut" 
                                width="280" 
                            />
                            {/*<img src="https://placehold.co/100x100" alt="Pie chart showing service distribution" />*/}
                        </div>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <p className="text-green-600"><i className="fas fa-male"></i> Laki-Laki</p>
                                <p>130.000.000 (50%)</p>
                            </div>
                            <div className="text-center">
                                <p className="text-pink-600"><i className="fas fa-female"></i> Wanita</p>
                                <p>130.000.000 (50%)</p>
                            </div>
                        </div>
                        <p className="text-center mt-4">Total: 6.000.000</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <i className="fas fa-filter mr-2"></i>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif</button>
                        </div>
                        <select className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Semua Sasaran</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <Chart 
                            options={barChartData.options} 
                            series={barChartData.series} 
                            type="bar" 
                            height={350} 
                            width={800}
                        />
                        {/*<img src="https://placehold.co/600x300" alt="Bar chart showing service targets over months" />*/}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Sasaran</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Penduduk</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Terlayani</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {[
                            'Ibu Hamil',
                            'Ibu Bersalin/Nifas',
                            'Bayi Baru Lahir',
                            'Bayi (0-11 Bulan)',
                            'Balita (1-4 Tahun)',
                            'Anak Prasekolah (5-6 tahun)',
                            'Anak Usia Sekolah (7-12 tahun)',
                            'Remaja (10-17 tahun)',
                            'Usia Dewasa (18-59 tahun)',
                            'Lansia (60+)',
                        ].map((target, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{target}</td>
                                <td className="px-6 py-4 whitespace-nowrap">4.901.000</td>
                                <td className="px-6 py-4 whitespace-nowrap">4.000.000</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default MainDashboard;