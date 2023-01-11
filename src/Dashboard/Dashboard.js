import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';


const Dashboard = () => {
    const [showDoctor,setshowDoctor]=useState(false)
    const [showMedicine,setshowMedicine]=useState(false)
    const [showPatient,setshowPatient]=useState(true)
    const [showDisease,setshowDisease]=useState(false)

    const [doctorView, setdoctorView] = useState([]);
    const [medicineView, setmedicineView] = useState([]);
    const [diseaseView, setdiseaseView] = useState([]);
    const [patientView, setpatientView] = useState([]);


    const ViewPatientDetails=()=>{
        setshowPatient(true)
        setshowDoctor(false)
        setshowMedicine(false)
        setshowDisease(false)
    }
    const ViewDiseaseDetails=()=>{
        setshowDisease(true)
        setshowDoctor(false)
        setshowMedicine(false)
        setshowPatient(false)
    }
    const ViewDoctorDetails=()=>{
     
        setshowDoctor(true)
        setshowMedicine(false)
        setshowDisease(false)
        setshowPatient(false)
    }
    const ViewMedicineDetails=()=>{
        setshowDoctor(false)
        setshowMedicine(true)
        setshowDisease(false)
        setshowPatient(false)
    }

    const fetchPatientDetails = async () => {

        const data = await fetch("http://localhost:5000/Patient")

        const parsedData = await data.json()

        setpatientView(parsedData)

    }
    const fetchDiseaseDetails = async () => {

        const data = await fetch("http://localhost:5000/Disease")

        const parsedData = await data.json()

        setdiseaseView(parsedData)

    }
    const fetchMedicineDetails = async () => {

        const data = await fetch("http://localhost:5000/Medicine")
        const parsedData = await data.json()
        setmedicineView(parsedData)

    }

    const fetchDoctorDetails = async () => {
        const data = await fetch("http://localhost:5000/doctor")
        const parsedData = await data.json()
        setdoctorView(parsedData)
    }

    const openNav = () => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        }
    }

    useEffect(() => {
        fetchDoctorDetails()
        fetchMedicineDetails()
        fetchDiseaseDetails()
        fetchPatientDetails()
    }, [])
    return (
        <>

            <div className="sb-nav-fixed">
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4 ">
                                <h1 className="mt-4" style={{color: 'dark'}}>Dashboard</h1>
                                {/* <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol> */}
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-body">Patients</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" onClick={ViewPatientDetails}>View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-warning text-white mb-4">
                                            <div className="card-body">Doctors</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" onClick={ViewDoctorDetails}>View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-success text-white mb-4">
                                            <div className="card-body">Medicines</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" onClick={ViewMedicineDetails}>View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-danger text-white mb-4">
                                            <div className="card-body">Disease</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" onClick={ViewDiseaseDetails}>View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                {showPatient && <div className="card-header bg-primary">
                                        <i className="fas fa-table me-1 "></i>
                                         Patient Details {' '}
                                        <form className="d-none d-md-inline-block" >
                                            <div className="input-group" >
                                            </div>
                                        </form>
                                    </div>}
                                    {showDoctor && <div className="card-header bg-warning">
                                        <i className="fas fa-table me-1"></i>
                                         Doctor Details {' '}
                                        <form className="d-none d-md-inline-block" >
                                            <div className="input-group" >
                                            </div>
                                        </form>
                                    </div>}
                                    {showMedicine && <div className="card-header bg-success">
                                        <i className="fas fa-table me-1"></i>
                                         Medicine Details {' '}
                                        <form className="d-none d-md-inline-block" >
                                            <div className="input-group" >
                                            </div>
                                        </form>
                                    </div>}
                                    {showDisease && <div className="card-header bg-danger">
                                        <i className="fas fa-table me-1"></i>
                                         Disease Details {' '}
                                        <form className="d-none d-md-inline-block" >
                                            <div className="input-group" >
                                            </div>
                                        </form>
                                    </div>}
                                    
                                   

                                    <div className="card-body">
                                    {showPatient && <Table striped bordered hover variant="primary">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th>Email Address</th>
                                                    <th>Mobile</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {patientView.map((addPatient) => {
                                                    return <tr>
                                                        <td>{addPatient.name}</td>
                                                        <td>{addPatient.email}</td>
                                                        <td>{addPatient.mobile}</td>
                                                    </tr>
                                                })}
                                            </tbody>

                                        </Table>}   
                                       {showDoctor &&  <Table striped bordered hover variant="warning">
                                            <thead>
                                                <tr>
                                                    <th>Doctor Name</th>
                                                    <th>Email Address</th>
                                                    <th>Mobile</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {doctorView.map((adddoctor) => {
                                                    return <tr>
                                                        <td>{adddoctor.name}</td>
                                                        <td>{adddoctor.doctoremailaddress}</td>
                                                        <td>{adddoctor.mobile}</td>
                                                    </tr>
                                                })}
                                            </tbody>

                                        </Table>}

                                      {showMedicine && <Table striped bordered hover variant="success">
                                            <thead>
                                                <tr>
                                                    <th>Medicine Name</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {medicineView.map((addmedicine) => {
                                                    return <tr>
                                                        <td>{addmedicine.name}</td>
                                                    </tr>
                                                })}
                                            </tbody>



                                        </Table>}
                                        {showDisease &&  <Table striped bordered hover variant="danger">
                                            <thead>
                                                <tr>
                                                    <th>Disease Name</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {diseaseView.map((adddisease) => {
                                                    return <tr>
                                                        <td>{adddisease.name}</td>
                                                    </tr>
                                                })}
                                            </tbody>



                                        </Table>}
                                    </div>
                                </div>
                            </div>
                        </main>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard