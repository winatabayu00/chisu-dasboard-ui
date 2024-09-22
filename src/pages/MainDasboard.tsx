import React, {useState} from 'react';
import DateRangeFilter from "../components/field/DateRangeFilter.tsx";
import OptionHeaderDashboard from "../components/layout/OptionHeaderDashboard.tsx";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import TableComponent from "../components/TableComponent";
import SelectOption from "../components/field/SelectOption.tsx";

const Dashboard: React.FC = () => {
    const donutData = {
        seriesPenduduk: [50, 50],
        seriesTerlayani: [45, 55],
    };

    const barChartData = {
        series: [
            {name: 'Target', data: [10, 25, 30, 40, 50]},
            // {name: 'Terlayani', data: [5, 20, 25, 35, 45]}
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    };

    const tableData = [
        {name: 'Ibu Hamil', population: 4901000, served: 4000000},
        {name: 'Ibu Bersalin/Nifas', population: 4901000, served: 4000000},
        // Add more data as needed
    ];

    function SemuaSasaran() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Semua Sasaran"},
            {value: "sasaran1", label: "Sasaran 1"},
            {value: "sasaran2", label: "Sasaran 2"},
            {value: "sasaran3", label: "Sasaran 3"}
        ];

        const handleSelectChange = (value: string) => {
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

            </div>
        );
    }

    function SemuaLayanan() {
        const [selected, setSelected] = useState("");
        const options = [
            {value: "", label: "Semua Layanan"},
            {value: "layanan1", label: "Layanan 1"},
            {value: "layanan2", label: "Layanan 2"},
            {value: "layanan3", label: "Layanan 3"}
        ];

        const handleSelectChange = (value: string) => {
            setSelected(value);
            console.log("Selected:", value);
        };

        return (
            <div>
                <h1>Pilih Layanan</h1>
                <SelectOption
                    options={options}
                    defaultValue=""
                    onChange={handleSelectChange}
                    className="bg-gray-50 me-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

            </div>
        );
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="flex h-screen">
                <main className="flex-1 p-6 headers">

                    <DateRangeFilter/>

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                    <OptionHeaderDashboard/>

                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>

                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DonutChart title="JUMLAH PENDUDUK" series={donutData.seriesPenduduk} colour="#8FFACC"/>
                        <DonutChart title="JUMLAH TERLAYANI" series={donutData.seriesTerlayani} colour="#FFD4D4"/>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center me-2">
                                <i className="fas fa-filter mr-2"></i>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Persentase
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <SemuaSasaran/>
                                <SemuaLayanan/>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <BarChart series={barChartData.series} categories={barChartData.categories}/>

                        </div>
                    </div>


                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center me-2">
                                <i className="fas fa-filter mr-2"></i>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Mingguan</button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Bulanan
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Absolut
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Kumulatif
                                </button>
                                <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Persentase
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <SemuaSasaran/>
                                <SemuaLayanan/>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <BarChart series={barChartData.series} categories={barChartData.categories}/>

                        </div>
                    </div>


                    {/* Table */}
                    <TableComponent data={tableData}/>

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
