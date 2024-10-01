import React from 'react';

interface TableComponentProps {
    data: { name: string; population: number; served: number }[];
    message?: string; // Add an optional message prop
}

const TableComponent: React.FC<TableComponentProps> = ({ data, message }) => (
    <div className="relative overflow-x-auto bg-white p-4 rounded-lg shadow-md" style={{ width: '100%', height: '100%' }}>
        <table className="min-w-full divide-y divide-gray-200" >
            <thead className="bg-[#122B4C] text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Sasaran</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Penduduk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Terlayani</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? ( // Check if data is empty
                    <tr>
                        <td colSpan={3} className="px-6 py-4 text-center" style={{ color: "red" }}>
                            {message || "Tidak ada data."} {/* Display the message or a default message */}
                        </td>
                    </tr>
                ) : (
                    data.map((target, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: "black" }}>{target.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: "black" }}>{target.population}</td>
                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: "black" }}>{target.served}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default TableComponent;
