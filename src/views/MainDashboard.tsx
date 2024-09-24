import {useState} from "react";
import SidebarDashboard from '../components/SidebarDashboard.tsx';
import SelectOption from '../components/field/SelectOption.tsx';

import Chart from "react-apexcharts";
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import HeaderDashboard from "../components/HeaderDashboard.tsx";
import icon_statistik from '../assets/images/Icon.png';

function MainDashboard() {
    // Data for Pie Charts
    const pieData = {
        seriesPenduduk: [50, 50],  // Example data for male/female population
        seriesTerlayani: [45, 55], // Example data for male/female served
        options: {
            chart: {
                type: 'pie',  // Change to 'pie'
            },
            labels: ['Laki-Laki', 'Wanita'],
            colors: ['#00E396', '#1A8D5C'],
            legend: {
                position: 'bottom',
            },
        },
    };


    const pieDataLayani = {
        seriesPenduduk: [50, 50],  // Example data for male/female population
        seriesTerlayani: [45, 55], // Example data for male/female served
        options: {
            chart: {
                type: 'pie',  // Change to 'pie'
            },
            labels: ['Laki-Laki', 'Wanita'],
            colors: ['#FF6262', '#FFAFAF'],
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
                <HeaderDashboard/>

                <DateRangeFilter/>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <OptionHeaderDashboard/>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                {/* Row with 4 cards displaying total data */}
                {/*                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div style={{ backgroundColor: '#FFE2E5' }} className="p-4 rounded-lg shadow-md text-white">

                        <img src={icon_statistik} alt="icon" style={{ width: '45px', height: '45px' }} className="inline-block mr-2 h-6 w-6" />
                        <h2 className="mt-4 font-bold text-left text-2xl">
                            260,000,000
                        </h2>
                        <p style={{color:'#425166'}} className="text-left mt-3 ">
                            Total Sasaran
                        </p>
                    </div>
                    <div className="bg-pink-500 p-4 rounded-lg shadow-md text-white">
                        <h2 className="text-lg font-bold text-center">Total Terlayani</h2>
                        <p className="text-center mt-4 text-2xl">130,000,000</p>
                    </div>
                    <div className="bg-green-500 p-4 rounded-lg shadow-md text-white">
                        <h2 className="text-lg font-bold text-center">Total Pria Terlayani</h2>
                        <p className="text-center mt-4 text-2xl">65,000,000</p>
                    </div>
                </div>
*/}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 style={{backgroundColor: '#78F5C0'}}
                            className="text-lg font-bold text-center text-black-600 py-2 rounded-t-lg">
                            JUMLAH PENDUDUK
                        </h2>
                        {/*<h2 style={{backgroundColor: '#78F5C0'}} className="text-lg font-bold text-center text-black-600">JUMLAH PENDUDUK</h2>*/}
                        <div className="flex justify-center my-4">
                            <Chart
                                options={pieData.options}
                                series={pieData.seriesPenduduk}
                                type="pie"  // Changed to 'pie'
                                width="280"
                            />
                        </div>
                        <div className="flex justify-around">
                            <div className="flex justify-center items-center">
                                <div className="text-center" style={{
                                    backgroundColor: '#1A8D5C',
                                    padding: '10px',
                                    width: '65px',
                                    height: '10px'
                                }}>
                                </div>
                                <p className="text-center ml-4 mt-0">Total: 260.000.000</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 style={{backgroundColor: '#FFC7C7'}}
                            className="text-lg font-bold text-center text-black-600 py-2 rounded-t-lg">JUMLAH
                            TERLAYANI</h2>
                        <div className="flex justify-center my-4">
                            <Chart
                                options={pieDataLayani.options}
                                series={pieDataLayani.seriesTerlayani}
                                type="pie"  // Changed to 'pie'
                                width="280"
                            />
                        </div>
                        <div className="flex justify-around">
                            <div className="flex justify-center items-center">
                                <div className="text-center" style={{
                                    backgroundColor: '#FF6262',
                                    padding: '10px',
                                    width: '65px',
                                    height: '10px'
                                }}>
                                </div>
                                <p className="text-center ml-4 mt-0">Total: 260.000.000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6 ">

                    <div style={{paddingLeft: "180px"}} className="flex justify-between items-center mb-4">
                        {/*<FilterViewDashboard/>*/}


                        <div className="flex items-center me-2">
                            <i className="fas fa-filter mr-2"></i>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Persentase</button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-right mb-6">
                            <SemuaSasaran/>

                            {/*<SemuaLayanan/>*/}
                        </div>

                    </div>
                    {/* Bar chart */}


                    <div className="flex justify-center">
                        <Chart
                            options={barChartData.options}
                            series={barChartData.series}
                            type="bar"
                            height={350}
                            width={800}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama
                                Sasaran
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah
                                Penduduk
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah
                                Terlayani
                            </th>
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
                                <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'black' }}> {target}</td>
                                <td className="px-6 py-4 whitespace-nowrap"> Tetst</td>
                                <td className="px-6 py-4 whitespace-nowrap test">4.000.000</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );


    function SemuaSasaran() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Semua Sasaran"},
            {value: "sasaran1", label: "Sasaran 1"},
            {value: "sasaran2", label: "Sasaran 2"},
            {value: "sasaran3", label: "Sasaran 3"}
        ];

        const handleSelectChange = (value) => {
            setSelected(value);
            console.log("Selected:", value);
        };

        return (
            <div>
                <h1>Pilih Sasaran</h1>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <p></p>
            </div>
        );
    }

}

export default MainDashboard;
