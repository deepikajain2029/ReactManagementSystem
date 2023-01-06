
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Login from './Dashboard/Login';
import AddDoctor from './Doctor/AddDoctor';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import ViewAllDoctors from './Doctor/ViewAllDoctors';
import AddDisease from './Disease/AddDisease';
import ViewAllDiseases from './Disease/ViewAllDiseases';
import AddMedicine from './Medicine/AddMedicine';
import ViewAllMedicines from './Medicine/ViewAllMedicines';
import AddPatientDisease from './Patient Disease/AddPatientDisease';
import ViewPatientsDisease from './Patient Disease/ViewPatientsDisease';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="adddoctor" element={<AddDoctor />}></Route>
          <Route path="viewalldoctors" element={<ViewAllDoctors />}></Route>
          <Route path="adddisease" element={<AddDisease />}></Route>
          <Route path="viewalldiseases" element={<ViewAllDiseases />}></Route>
          <Route path="addmedicine" element={<AddMedicine />}></Route>
          <Route path="viewallmedicines" element={<ViewAllMedicines />}></Route>
          <Route path="addpatientdisease" element={<AddPatientDisease />}></Route>
          <Route path="viewpatientdisease" element={<ViewPatientsDisease />}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
