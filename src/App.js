
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import Login from './Dashboard/Login';
import AddDoctor from './Doctor/AddDoctor';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import ViewAllDoctors from './Doctor/ViewAllDoctors';
import AddDisease from './Disease/AddDisease';
import ViewAllDiseases from './Disease/ViewAllDiseases';
import AddMedicine from './Medicine/AddMedicine';
import ViewAllMedicines from './Medicine/ViewAllMedicines';
import AddPatient from './Patient/AddPatient';
import ViewAllPatient from './Patient/ViewAllPatient';
import AddPatientDisease from './Patient Disease/AddPatientDisease';
import ViewPatientsDisease from './Patient Disease/ViewPatientsDisease';

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
          <Route path="adddisease" element={<AddDisease />}></Route>
          <Route path="viewalldiseases" element={<ViewAllDiseases />}></Route>
          <Route path="addmedicine" element={<AddMedicine />}></Route>
          <Route path="viewallmedicines" element={<ViewAllMedicines />}></Route>
          <Route path="addpatient" element={<AddPatient/>}></Route>
          <Route path="viewallpatients" element={<ViewAllPatient />}></Route>       
          <Route path="addpatientdisease" element={<AddPatientDisease />}></Route>
          <Route path="viewpatientdisease" element={<ViewPatientsDisease />}></Route>
          <Route path="/viewalldoctors" element={<ViewAllDoctors />}></Route>
        </Routes>
        {location.pathname !== '/login'  && <Footer/>}
    </div>
  );
}

export default App;