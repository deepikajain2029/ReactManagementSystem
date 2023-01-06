
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import {  Routes, Route } from 'react-router-dom';
import Login from './Dashboard/Login';
import AddDoctor from './Doctor/AddDoctor';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import ViewAllDoctors from './Doctor/ViewAllDoctors';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="adddoctor" element={<AddDoctor />}></Route>
          <Route path="viewalldoctors" element={<ViewAllDoctors />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
