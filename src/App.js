
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import Login from './Dashboard/Login';
import AddDoctor from './Doctor/AddDoctor';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import ViewAllDoctors from './Doctor/ViewAllDoctors';

function App() {
  let location = useLocation();
  return (
    <div>
        {location.pathname !== '/login' && <Header/>}
        <Routes>
        <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/adddoctor" element={<AddDoctor />}></Route>
          <Route path="/viewalldoctors" element={<ViewAllDoctors />}></Route>
          <Route path="/viewalldoctors" element={<ViewAllDoctors />}></Route>
        </Routes>
        {location.pathname !== '/login'  && <Footer/>}
    
    </div>
  );
}

export default App;