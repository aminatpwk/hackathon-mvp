import './App.css';
import FarmerDashboard from './components/pages/FarmerDashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterForm from './components/pages/RegisterForm';
import LandingPage from './components/pages/LandingPage';
import Products from './components/pages/Products';
import LoginForm from './components/pages/LoginForm';
import TermsOfUsePage from "./components/pages/TermsOfUsePage";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage";
import FAQPage from "./components/pages/FaqPage";
import ConsumerProductsPage from "./components/pages/ConsumerProductsPage";
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/merrbio" element={<LandingPage/>}/>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path ="/products" element = {<Products/>}/>
            <Route path = "/hyr" element = {<LoginForm/>}/>
            <Route path = "/terms" element = {<TermsOfUsePage/>}/>
            <Route path = "/privacy" element = {<PrivacyPolicyPage/>}/>
            <Route path = "/faq" element = {<FAQPage/>}/>
            <Route path = "/consumerdashboard" element = {<ConsumerProductsPage/>}/>
        </Routes>
      </Router>
  );
}

export default App;
