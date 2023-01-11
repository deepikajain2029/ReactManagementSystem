import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles.css";

const ViewAllPatient = () => {

    const [search, SetSearch] = useState("");
    const [patientView, setpatientView] = useState([]);
    const navigate = useNavigate();

    const fetchPatientDetails = async () => {
        const data = await fetch("http://localhost:5000/Patient")
        const parsedData = await data.json()
        setpatientView(parsedData)

    }

    const columns = [

        {
            id: "patientname",
            name: "Patients",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            id: "email",
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            id: "address1",
            name: "Address 1",
            selector: (row) => row.address1,
            sortable: true,
        },

        {
            id: "address2",
            name: "Address 2",
            selector: (row) => row.address2,
            sortable: true,
        },

        {
            id: "mobile",
            name: "Mobile",
            selector: (row) => row.mobile,
            sortable: true,
        },
        {
            id: "edit",
            name: "Edit",
            cell: (row) =>
            (
                <AiFillEdit onClick={() => editPatient(row.id)}></AiFillEdit>
            ),
        },

        {
            id: "delete",
            name: "Delete",
            cell: (row) =>
            (
                <AiFillDelete onClick={() => deletePatient(row.id)}></AiFillDelete>
            ),
        }
    ]
    const deletePatient = async (id) => {
        const data = await fetch(`http://localhost:5000/Patient/${id}`, { method: 'delete' })
        const response = await data.json();
        fetchPatientDetails();
    }

    const editPatient = async (id) => {
        const data = await fetch(`http://localhost:5000/Patient/${id}`)
        const response = await data.json();
        console.log(response)
        navigate("/addpatient" , { state: { addPatient: response } })
        // navigate("/addpatient", { state: { addpatient: response } })
    }

    useEffect(() => {

        fetchPatientDetails();

    }, []

    );

    useEffect(() => {

        let filtered = patientView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        setpatientView(filtered)
    }, [search]

    )
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View All Patients"
                                columns={columns}
                                data={patientView}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight='450px'
                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                                subHeaderComponent={<input type="text" placeholder='search by name'
                                    value={search}
                                    onChange={(e) => SetSearch(e.target.value)} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAllPatient