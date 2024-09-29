import React from 'react';
interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <header className="d-flex justify-between items-center mb-6">
        <div className="d-flex bg-gray-100 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800" style={{paddingLeft:'280px'}}>{title}</h1>
            <div className="flex items-center">
                <div
                    className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-2">
                    <span className="font-bold">KH</span>
                </div>
                <div>
                    {/*<p className="text-[#00B065] font-bold">Karna Habibi</p>*/}
                    {/*<p className="text-[#0F172A]">Administrator</p>*/}
                </div>
            </div>
        </div>
    </header>
);

export default Header;
