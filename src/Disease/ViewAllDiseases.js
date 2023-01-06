import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewAllDiseases = () => {
    const [diseaseView, setdiseaseView] = useState([]);
    const navigate = useNavigate();
    const fetchDiseaseDetails = async () => {
        const data = await fetch("http://localhost:5000/Disease")
        const parsedData = await data.json()
        setdiseaseView(parsedData)
    }
    const deleteDisease = async (id) => {
        const data = await fetch(`http://localhost:5000/Disease/${id}`, { method: 'delete' })

        const response = await data.json();

        fetchDiseaseDetails();
    }
    const editDisease = async (id) => {

        const data = await fetch(`http://localhost:5000/Disease/${id}`)

        const response = await data.json();

        console.log(response)

        navigate("/adddisease", { state: { adddisease: response } })

    }
    const getDiseaseByName = async (diseaseName) => {
        console.log(diseaseName);
        const data = await fetch(`http://localhost:5000/Disease/${diseaseName}`)

        const response = await data.json();

        console.log(response)

        // navigate("/updatetodo" , {state:{todo:response}})

    }
    useEffect(() => {

        fetchDiseaseDetails()
    }, [])
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div class="row">
                            <h2 class="text-center">View All Disease</h2>
                            <div className="card-header">
                                <form className="d-none d-md-inline-block" >
                                    <div className="input-group" >
                                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                            <Table striped bordered hover>
                                <thead style={{ "background-color": "#0d6efd" }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diseaseView.map((adddisease) => {
                                        return <tr>
                                            <td>{adddisease.id}</td>
                                            <td>{adddisease.name}</td>
                                            <td>
                                                <AiFillEdit onClick={() => editDisease(adddisease.id)}></AiFillEdit>{'   '}
                                                <AiFillDelete onClick={() => deleteDisease(adddisease.id)}></AiFillDelete></td>
                                        </tr>

                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAllDiseases
