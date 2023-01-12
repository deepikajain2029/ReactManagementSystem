import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import "../styles.css";

const ViewAllDoctors = () => {
    const [search, SetSearch] = useState("");
    const [doctorView, setdoctorView] = useState([]);
    const [roleView, setRoleView] = useState([]);
    const navigate = useNavigate();

    const fetchDoctorDetails = async () => {
        const data = await fetch("http://localhost:5000/doctor")
        const parsedData = await data.json()
        setdoctorView(parsedData)
    }
    const fetchRoles = async () => {
        const data1 = await fetch("http://localhost:5000/Roles")
        const parsedData1 = await data1.json()
        setRoleView(parsedData1)
    }

    const columns = [
        {

            id: "doctname",
            name: "Doctors",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "sepicalist",
            name: "Sepicalist",
            selector: (row) => row.specialist,
            sortable: true,
            wrap: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },

        {
            id: "degree",
            name: "Degree",
            selector: (row) => row.degree,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
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
            wrap: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },

        {
            id: "email",
            name: "Email",
            selector: (row) => row.doctoremailaddress,
            sortable: true,
            wrap: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "edit",
            name: "Edit",
            width:'80px',
            cell: (row) =>
            (
                <AiFillEdit style={{color:"87CEFA"}} onClick={() => editDoctor(row.id)}></AiFillEdit>
            ),
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "delete",
            name: "Delete",
            width:'100px',
            cell: (row) =>
            (
                <AiFillDelete style={{color:"red"}} onClick={() => deleteDoctor(row.id)}></AiFillDelete>
            ),
            style: {
                background:'#F3F3F3',
                fontSize: '20px'
              },
        }
    ]

    const editDoctor = async (id) => {
        const data = await fetch(`http://localhost:5000/doctor/${id}`)
        const response = await data.json();
        navigate("/adddoctor", { state: { adddoctor: response } })
    }
    const deleteDoctor = async (id, email_address) => {
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
                const data = fetch(`http://localhost:5000/doctor/${id}`, { method: 'delete' })
                const items = roleView.filter(item => item.email_address == email_address);
                if (items.length > 0) {
                    const data1 = fetch(`http://localhost:5000/Roles/${items[0].id}`, { method: 'delete' })
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload(true)
            }
        })


        fetchDoctorDetails();
    }

    useEffect(() => {
        if (search == "") {
            fetchDoctorDetails();
            fetchRoles();
        }
        else {
            let filtered = (doctorView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialist.toLowerCase().includes(search.toLowerCase())
                || d.degree.toLowerCase().includes(search.toLowerCase())
                || d.doctoremailaddress.toLowerCase().includes(search.toLowerCase())
                || d.mobile.toLowerCase().includes(search.toLowerCase())
            ))
            setdoctorView(filtered)
        }
    }, [search]
    )
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View All Doctors"
                                columns={columns}
                                data={doctorView}
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
    );
}

export default ViewAllDoctors