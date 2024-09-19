import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MorbiditasDashboard from './components/MorbiditasDashboard.tsx';
import ServiceDashboard from './components/ServiceDashboard.tsx';
import MainDashboard from './components/MainDashboard.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/morbiditas-dashboard" element={<MorbiditasDashboard />} />
                <Route path="/service-dashboard" element={<ServiceDashboard />} />
                <Route path="/main-dashboard" element={<MainDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
