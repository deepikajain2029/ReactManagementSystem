import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import "../styles.css";

const ViewAllPatient = () => {
    const [search, SetSearch] = useState("");
    const [roleView, setRoleView] = useState([]);
    const [patientView, setpatientView] = useState([]);
    const navigate = useNavigate();

    const fetchPatientDetails = async () => {
        const data = await fetch("http://localhost:5000/Patient")
        const parsedData = await data.json()
        setpatientView(parsedData)
    }
    const fetchRoles = async () => {
        const data2 = await fetch("http://localhost:5000/Roles")
        const parsedData1 = await data2.json()
        setRoleView(parsedData1)
    }
    const columns = [
        {
            id: "patientname",
            name: "Patients",
            selector: (row) => row.name,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "email",
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3',
                width:'1100px'
              },
        },

        {
            id: "address1",
            name: "Address 1",
            selector: (row) => row.address1,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "address2",
            name: "Address 2",
            selector: (row) => row.address2,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "mobile",
            name: "Mobile",
            selector: (row) => row.mobile,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "edit",
            name: "Edit",
            cell: (row) =>
            (
                <AiFillEdit style={{color:"87CEFA"}} onClick={() => editPatient(row.id)}></AiFillEdit>
            ),
            style: {
                fontSize: '20px',
                background:'#F3F3F3',
              },
        },
        {
            id: "delete",
            name: "Delete",
            cell: (row) =>
            (
                <AiFillDelete style={{color:"red"}} onClick={() => deletePatient(row.id)}></AiFillDelete>
            ),
            style: {
                background:'#F3F3F3',
                fontSize: '20px',
              },
        }
    ]
    const deletePatient = async (id, email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const data =  fetch(`http://localhost:5000/Patient/${id}`, { method: 'delete' })
                const items = roleView.filter(item => item.email_address == email);
                if (items.length > 0) {
                    const data1 =  fetch(`http://localhost:5000/Roles/${items[0].id}`, { method: 'delete' })
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload(true)
            }
        })
        fetchPatientDetails();
    }

    const editPatient = async (id) => {

        const data = await fetch(`http://localhost:5000/Patient/${id}`)

        const response = await data.json();

        console.log(response)

        navigate("/addpatient", { state: { addPatient: response } })

        // navigate("/addpatient", { state: { addpatient: response } })

    }

    useEffect(() => {
        if (search == "") {
            fetchPatientDetails();
            fetchRoles();
        }
        else {
            let filtered = (patientView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase())
                || d.address1.toLowerCase().includes(search.toLowerCase())
                || d.address2.toLowerCase().includes(search.toLowerCase())
                || d.mobile.toLowerCase().includes(search.toLowerCase())
            ))
            setpatientView(filtered)
        }
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
                                fixedHeaderScrollHeight='350px'
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