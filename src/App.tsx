import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MorbiditasDashboard from './views/MorbiditasDashboard.tsx';
import ServiceDashboard from './views/ServiceDashboard.tsx';
import MainDashboard from './views/MainDashboard.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/morbilitas-dashboard" element={<MorbiditasDashboard />} />
                <Route path="/service-dashboard" element={<ServiceDashboard />} />
                <Route path="/" element={<MainDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
