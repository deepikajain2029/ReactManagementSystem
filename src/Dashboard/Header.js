import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import {Link  } from 'react-router-dom';

const Header = () => {
    const openNav = () => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        }
    }
  return (
    <>

    <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={openNav} id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <a className="navbar-brand ps-3" href="/dashboard">Patient Management System</a>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Update Password</a></li>
                        <li><a className="dropdown-item" href="#!">Add Admin</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <a className="nav-link" href="/dashboard">
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
                                    <a className="nav-link" href="/adddoctor">Add Doctor</a>
                                    <a className="nav-link" href="/viewalldoctors">View All Doctors</a>
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
                                    <a className="nav-link" href="/addpatient">Add Patient</a>
                                    <a className="nav-link" href="/viewallpatients">View All Patients</a>
                                    <a className="nav-link" href="layout-sidenav-light.html">Patients Disease</a>
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
                                    <a className="nav-link" href="/adddisease">Add Disease</a>
                                    <a className="nav-link" href="/viewalldiseases">View All Disease</a>
                                    
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
                                    <a className="nav-link" href="/addmedicine">Add Medicine</a>
                                    <a className="nav-link" href="/viewallmedicines">View All Medicine</a>
                                </nav>
                            </div>
                           
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>
            
        </div>

    </div>
</>
  )
}

export default Header