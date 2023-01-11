import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firbase";
import { signOut, sendPasswordResetEmail } from "firebase/auth";

const Header = () => {

    const openNav = () => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        }
        window.$roles='admin'
    }
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    if (!user) {
        navigate("/login")
    }
    const setDashboard=()=>
    {
        window.$roles='admin'
        navigate("/dashboard")
    }
    const setrlesvalue=()=>
    {
        window.$roles='admin'
        navigate("/adddoctor")
    }
    const setAllDoctorvalue=()=>
    {
        window.$roles='admin'
        navigate("/viewalldoctors")
    }
    const setAddPatientvalue=()=>
    {
        window.$roles='admin'
        navigate("/addpatient")
    }
    const setViewPatientvalue=()=>
    {
        window.$roles='admin'
        navigate("/viewallpatients")
    }
    const setAddDiseasevalue=()=>
    {
        window.$roles='admin'
        navigate("/adddisease")
    }
    const setviewpatientdisease=()=>
    {
        window.$roles='admin'
        navigate("/viewpatientdisease")
    }
    const setviewalldiseases=()=>
    {
        window.$roles='admin'
        navigate("/viewalldiseases")
    }
    const setaddmedicine=()=>
    {
        window.$roles='admin'
        navigate("/addmedicine")
    }
    const setviewallmedicines=()=>
    {
        window.$roles='admin'
        navigate("/viewallmedicines")
    }
    const setaddpatientdisease=()=>
    {
        window.$roles='doctor'
        navigate("/addpatientdisease")
    }
    const setviewdoctorpatienthistory=()=>
    {
        window.$roles='doctor'
        navigate("/viewdoctorpatienthistory")
    }
    const serAddadmin=()=>
    {
        window.$roles='admin'
        navigate("/addadmin")
    }
    
    const Signout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            // An error happened.
        });
    }
    const forgotPassword = () => {
        sendPasswordResetEmail(auth, user.email).then(() => {
            alert('please check your email...')
        }).catch((error) => {
            // An error happened.
        });
    }
    const [roles, setRoles] = useState([]);
    const getRoles = async () => {
        const data = await fetch("http://localhost:5000/Roles")
        const response = await data.json();
        setRoles(response)
        const items = roles.filter(item => item.email_address == user.email);
        window.$role = items[0].role;
    }
    useEffect(() => {

    }, []
    );
    return (
        <>

            <div className="sb-nav-fixed" >
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    {window.$role != 'admin' ? "" :
                        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={openNav} id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                    }
                    <a className="navbar-brand ps-3">Patient Management System</a>
                    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">

                    </form>

                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" onClick={forgotPassword} href="#!">Update Password</a></li>
                                {window.$role === 'admin' ?
                                    <li><a className="dropdown-item" onClick={serAddadmin}>Add Admin</a></li> : ""
                                }
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" onClick={Signout} href="#!">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {(() => {
                    if (window.$role === 'admin') {
                        return (
                            <div id="layoutSidenav">
                                <div id="layoutSidenav_nav">
                                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                                        <div className="sb-sidenav-menu">
                                            <div className="nav">
                                                <a className="nav-link" onClick={setDashboard}>
                                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                                    Dashboard
                                                </a>
                                                {/* Doctor Area */}

                                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                                    Doctor
                                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                </a>
                                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                                    <nav className="sb-sidenav-menu-nested nav">
                                                        <a className="nav-link" onClick={setrlesvalue}>Add Doctor</a>
                                                        <a className="nav-link" onClick={setAllDoctorvalue} >View All Doctors</a>
                                                    </nav>
                                                </div>
                                                {/* Patient Area */}
                                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                                    Patient
                                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                </a>
                                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                                        <a className="nav-link" onClick={setAddPatientvalue}>Add Patient</a>
                                                        <a className="nav-link" onClick={setViewPatientvalue} >View All Patients</a>
                                                    </nav>
                                                </div>

                                                {/* Disease Area */}
                                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseDisease" aria-expanded="false" aria-controls="collapsePages">
                                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                                    Disease
                                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                </a>
                                                <div className="collapse" id="collapseDisease" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                                        <a className="nav-link" onClick={setAddDiseasevalue}>Add Disease</a>
                                                        <a className="nav-link" onClick={setviewalldiseases}>View All Disease</a>
                                                        <a className="nav-link" onClick={setviewpatientdisease}>View All Patients Disease</a>
                                                    </nav>
                                                </div>
                                                {/* Medicine Area */}
                                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMedicine" aria-expanded="false" aria-controls="collapsePages">
                                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                                    Medicine
                                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                </a>
                                                <div className="collapse" id="collapseMedicine" aria-labelledby="headingFour" data-bs-parent="#sidenavAccordion">
                                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                                        <a className="nav-link" onClick={setaddmedicine}>Add Medicine</a>
                                                        <a className="nav-link" onClick={setviewallmedicines}>View All Medicine</a>
                                                    </nav>
                                                </div>

                                            </div>
                                        </div>

                                    </nav>
                                </div>
                            </div>
                        )
                    }
                    else if (window.$role === 'doctor') {
                        return (
                            <div id="layoutSidenav">

                                <div id="layoutSidenav_nav">
                                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                                        <div className="sb-sidenav-menu">
                                            <div className="nav">
                                                {/* Patient Disease Area */}
                                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePatientPages" aria-expanded="false" aria-controls="collapsePages">
                                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                                    Patient Disease
                                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                                </a>

                                                <div className="collapse" id="collapsePatientPages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                                        <a className="nav-link" onClick={setaddpatientdisease}>Add Patient Disease</a>
                                                        <a className="nav-link" onClick={setviewdoctorpatienthistory} >View Patients Disease</a>

                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (<div></div>)
                    }
                })()}
            </div>
        </>
    )
   
}

export default Header