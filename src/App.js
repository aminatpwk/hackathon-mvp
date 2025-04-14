import './App.css';
import FarmerDashboard from './components/pages/FarmerDashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterForm from './components/pages/RegisterForm';
import LandingPage from './components/pages/LandingPage';
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/merrbio" element={<LandingPage/>}/>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
