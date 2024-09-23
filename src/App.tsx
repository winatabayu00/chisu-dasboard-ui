// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MorbiditasDashboard from './views/MorbiditasDashboard.tsx';
// import ServiceDashboard from './views/ServiceDashboard.tsx';
// import MainDashboard from './views/MainDashboard.tsx';
//
// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/morbilitas-dashboard" element={<MorbiditasDashboard />} />
//                 <Route path="/service-dashboard" element={<ServiceDashboard />} />
//                 <Route path="/" element={<MainDashboard />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import MainDashboard from './pages/MainDasboard.tsx';
import MorbiditasDashboard from './pages/MorbiditasDashboard.tsx';
import ServiceDashboard from './pages/ServiceDashboard.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar/>
                <div className="flex-1">
                    <Header title="Dashboard Utama"/>
                    <Routes>
                        <Route path="/" element={<MainDashboard/>}/>
                        <Route path="/morbiditas-dashboard" element={<MorbiditasDashboard/>}/>
                        <Route path="/service-dashboard" element={<ServiceDashboard/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
