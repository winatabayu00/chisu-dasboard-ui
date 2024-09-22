import React from 'react';

interface TableComponentProps {
    data: { name: string; population: number; served: number }[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#122B4C] text-white">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Sasaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Penduduk</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Terlayani</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {data.map((target, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{target.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{target.population}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{target.served}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default TableComponent;
