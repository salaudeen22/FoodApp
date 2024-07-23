
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screen/Home.jsx';
import Login from './Screen/Login.jsx';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import"../node_modules/bootstrap/dist/js/bootstrap.bundle"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Screen/Signup.jsx';
import Myorder from './Screen/Myorder.jsx';
import AdminDashboard from './Screen/AdminDashboard.jsx';
import VendorDashBoard from './Screen/VendorDashBoard.jsx';



function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<Signup />} />
        <Route path="/myOrder" element={<Myorder />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/Vendor" element={<VendorDashBoard />} />
      </Routes>
    </Router>
  
  );
}
export default App;
