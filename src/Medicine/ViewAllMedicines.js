import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewAllMedicines = () => {
    const [medicineView, setmedicineView] = useState([]);
    const navigate = useNavigate();
    const fetchMedicineDetails = async () => {
        const data = await fetch("http://localhost:5000/Medicine")
        const parsedData = await data.json()
        setmedicineView(parsedData)
    }
    const deleteMedicine = async (id) => {
        const data = await fetch(`http://localhost:5000/Medicine/${id}`, { method: 'delete' })

        const response = await data.json();

        fetchMedicineDetails();
    }
    const editMedicine = async (id) => {

        const data = await fetch(`http://localhost:5000/Medicine/${id}`)

        const response = await data.json();

        console.log(response)

        navigate("/addmedicine", { state: { addmedicine: response } })

    }
    const getMedicineByName = async (medicineName) => {
        console.log(medicineName);
        const data = await fetch(`http://localhost:5000/Medicine/${medicineName}`)

        const response = await data.json();

        console.log(response)

        // navigate("/updatetodo" , {state:{todo:response}})

    }
    useEffect(() => {

        fetchMedicineDetails()
    }, [])
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div class="row">
                            <h2 class="text-center">View All Medicine</h2>
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
                                    {medicineView.map((addmedicine) => {
                                        return <tr>
                                            <td>{addmedicine.id}</td>
                                            <td>{addmedicine.name}</td>
                                            <td>
                                                <AiFillEdit onClick={() => editMedicine(addmedicine.id)}></AiFillEdit>{'   '}
                                                <AiFillDelete onClick={() => deleteMedicine(addmedicine.id)}></AiFillDelete></td>
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

export default ViewAllMedicines
