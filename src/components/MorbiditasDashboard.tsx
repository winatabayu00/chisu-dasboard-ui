import {useState} from "react";

function MorbiditasDashboard() {
    const [selectedDate, setSelectedDate] = useState('01/01/2024 - 01/01/2024');


    return (
        <div className="flex h-screen">
            <Sidebar />
            <MainContent />
        </div>
    );

    function NavItem({ text, icon, active, className }) {
        return (
            <div className={`flex items-center p-4 cursor-pointer ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600'} ${className}`}>
                <i className={`${icon} mr-3`}></i>
                <span>{text}</span>
            </div>
        );
    }

    function Sidebar() {
        return (
            <div className="w-64 bg-white shadow-md">
                <div className="flex items-center justify-center h-16 border-b">
                    <img src="https://placehold.co/40x40" alt="Logo" className="mr-2" />
                    <span className="text-lg font-semibold text-red-600">ILP MOJOKERTO</span>
                </div>
                <nav className="mt-4">
                    <NavItem text="Dashboard Utama" icon="fas fa-home" />
                    <NavItem text="Dashboard Morbiditas" icon="fas fa-chart-bar" active />
                    <NavItem text="Dashboard Layanan" icon="fas fa-concierge-bell" />
                </nav>
                <div className="absolute bottom-0 w-full p-4">
                    <NavItem text="Pengaturan" icon="fas fa-cog" />
                    <NavItem text="Keluar" icon="fas fa-sign-out-alt" className="text-red-600" />
                </div>
            </div>
        );
    }

    function MainContent() {
        return (
            <div className="flex-1 p-6">
                <Header />
                <Filters />
                <Dashboard />
            </div>
        );
    }

    function Header() {
        return (
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Dashboard Morbiditas</h1>
                <div className="flex items-center">
                    <div className="mr-4">
                        <span className="block text-sm text-gray-500">Karna Habibi</span>
                        <span className="block text-sm font-semibold">Administrator</span>
                    </div>
                    <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full" />
                </div>
            </div>
        );
    }

    function Filters() {
        const [startDate, setStartDate] = useState('01/01/2024');
        const [endDate, setEndDate] = useState('01/01/2024');

        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-6 gap-4">
                    <Select label="Kecamatan" options={['Pilih Kecamatan']} />
                    <Select label="Puskesmas" options={['Pilih Puskesmas']} />
                    <Select label="Desa/Kelurahan" options={['Pilih Desa/Kelurahan']} />
                    <Select label="Jenis Kelamin" options={['Pilih Jenis Kelamin']} />
                    <Select label="Sasaran" options={['Semua Sasaran']} />
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Range Tanggal</label>
                        <div className="flex items-center mt-1">
                            <input
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-l-md"
                            />
                            <span className="px-2">-</span>
                            <input
                                type="text"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-r-md"
                            />
                            <i className="fas fa-calendar-alt ml-2 text-gray-500"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function Select({ label, options }) {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <select className="w-full p-2 mt-1 border border-gray-300 rounded-md">
                    {options.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }

    function Dashboard() {
        const data = [
            { id: 1, text: 'Diseases of the circulatory system', value: '3.000.000', color: 'bg-teal-500' },
            { id: 2, text: 'Diseases of the respiratory system', value: '3.000.000', color: 'bg-teal-400' },
            { id: 3, text: 'Diseases of the digestive system', value: '3.000.000', color: 'bg-teal-300' },
            { id: 4, text: 'Diseases of the musculoskeletal system and connective tissue', value: '3.000.000', color: 'bg-teal-200' },
            { id: 5, text: 'Endocrine, nutritional and metabolic diseases', value: '3.000.000', color: 'bg-teal-100' },
            { id: 6, text: 'Symptom and abnormal clinical and laboratory findings not elsewhere classified', value: '3.000.000', color: 'bg-teal-50' },
            { id: 7, text: 'Diseases of the eye and adnexa', value: '3.000.000', color: 'bg-green-500' },
            { id: 8, text: 'Certain infectious and parasitic diseases', value: '3.000.000', color: 'bg-green-400' },
            { id: 9, text: 'Neoplasms', value: '3.000.000', color: 'bg-green-300' },
            { id: 10, text: 'Diseases of the genitourinary system', value: '3.000.000', color: 'bg-green-200' },
            { id: 11, text: 'Diseases of the nervous system', value: '3.000.000', color: 'bg-green-100' },
            { id: 12, text: 'Diseases of the skin and subcutaneous tissue', value: '3.000.000', color: 'bg-green-50' },
            { id: 13, text: 'Mental and behavioural disorders', value: '3.000.000', color: 'bg-yellow-500' },
            { id: 14, text: 'Injuring Poisoning', value: '3.000.000', color: 'bg-yellow-400' },
            { id: 15, text: '', value: '', color: 'bg-yellow-300' },
            { id: 16, text: '', value: '', color: 'bg-yellow-200' },
            { id: 17, text: '', value: '', color: 'bg-yellow-100' },
        ];

        return (
            <div className="grid grid-cols-4 gap-4">
                {data.map((item) => (
                    <div key={item.id} className={`p-4 text-white ${item.color} rounded-lg shadow-md`}>
                        <div className="text-sm font-semibold">#{item.id}. {item.text}</div>
                        <div className="text-lg font-bold">{item.value}</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default MorbiditasDashboard;
