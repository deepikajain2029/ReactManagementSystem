import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import {useAuthState} from 'react-firebase-hooks/auth'
//import { auth } from "./firebase";

const Dashboard = () => {
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
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Dashboard</h1>
                                {/* <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol> */}
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-body">Patients</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-warning text-white mb-4">
                                            <div className="card-body">Doctors</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-success text-white mb-4">
                                            <div className="card-body">Medicines</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-danger text-white mb-4">
                                            <div className="card-body">Disease</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <div className="card-header">
                                        <i className="fas fa-table me-1"></i>
                                        Patients Details {' '}
                                        <form className="d-none d-md-inline-block" >
                                            <div className="input-group" >
                                                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                                <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="card-body">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
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