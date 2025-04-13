import './App.css';
import FarmerDashboard from './components/pages/FarmerDashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterForm from './components/pages/RegisterForm';
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
