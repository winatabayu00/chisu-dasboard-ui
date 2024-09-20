import {useState} from "react";
import SidebarDashboard from '../components/SidebarDashboard.tsx'
import SelectOption from '../components/field/SelectOption.tsx'
// import DateRangeFilter from '../components/field/DateRangeFilter.tsx'
import OptionHeaderDashboard from '../components/layout/OptionHeaderDashboard.tsx'
import Chart from "react-apexcharts";
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import HeaderDashboard from "../components/HeaderDashboard.tsx";

function ServiceDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');

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

    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const handleDateChange = (start, end) => {
        setDateRange({ start, end });
    };
    return (
        <div className="flex w-screen">
            <SidebarDashboard/>

            <main className="flex-1 p-6 headers">

               <HeaderDashboard/>

                <DateRangeFilter/>

                <OptionHeaderDashboard/>

                <Grid/>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center me-2">
                            <i className="fas fa-filter mr-2"></i>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif</button>
                            <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Persentase</button>
                        </div>
                        <SemuaSasaran/>

                        <SemuaLayanan/>
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
                <p>Selected Option: {selected}</p>
            </div>
        );
    }

    function SemuaLayanan() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Semua Sasaran"},
            {value: "layanan1", label: "Layanan 1"},
            {value: "layanan2", label: "Layanan 2"},
            {value: "layanan3", label: "Layanan 3"}
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
                <p>Selected Option: {selected}</p>
            </div>
        );
    }

    function Grid() {
        const data = [
            {text: 'Total Sasaran', value: '0', svgColor: '#FA5A7D', cardColor: 'bg-[#FFE2E5]'},
            {text: 'Total Sasaran Terlayani', value: '0', svgColor: '#FF947A', cardColor: 'bg-[#FFF4DE]'},
            {text: 'Total Kunjungan', value: '0', svgColor: '#4CB77E', cardColor: 'bg-[#E5FFF1]'},
        ];

        return (

            <div className="grid grid-cols-3 gap-1">
                {data.map((item) => (
                    <div
                        className={`p-6 bg-white border border-gray-200 rounded-lg shadow ${item.cardColor} dark:${item.cardColor}`}>

                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill={`${item.svgColor}`}/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M13 11C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11H13ZM16 21C16 20.4477 15.5523 20 15 20C14.4477 20 14 20.4477 14 21V25C14 25.5523 14.4477 26 15 26C15.5523 26 16 25.5523 16 25V21ZM20 17C20.5523 17 21 17.4477 21 18V25C21 25.5523 20.5523 26 20 26C19.4477 26 19 25.5523 19 25V18C19 17.4477 19.4477 17 20 17ZM26 15C26 14.4477 25.5523 14 25 14C24.4477 14 24 14.4477 24 15V25C24 25.5523 24.4477 26 25 26C25.5523 26 26 25.5523 26 25V15Z"
                                  fill="white"/>
                        </svg>

                        <a href="#">
                            <h5 className="mb-2 mt-3 text-2xl font-semibold tracking-tight text-gray-900">{item.value}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-800 dark:text-gray-800">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            /* <div className="grid grid-cols-3 gap-4">
                 {data.map((item) => (
                     <div key={item.id} className={`p-4 text-white ${item.color} rounded-lg shadow-md`}>
                         <div className="text-sm font-semibold">#{item.id}. {item.text}</div>
                         <div className="text-lg font-bold">{item.value}</div>
                     </div>
                 ))}
             </div>*/
        );
    }

}

export default ServiceDashboard;
