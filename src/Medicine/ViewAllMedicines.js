import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import "../styles.css";
const ViewAllMedicines = () => {

    const [search, SetSearch] = useState("");
    const [medicineView, setmedicineView] = useState([]);
    const navigate = useNavigate();

    const fetchMedicineDetails = async () => {
        const data = await fetch("http://localhost:5000/Medicine")
        const parsedData = await data.json()
        setmedicineView(parsedData)
    }

    const columns = [
        {
            id: "mediciname",
            name: "Medicine Name",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            style: {
                fontSize: '15px',
                background: '#F3F3F3'
            },
        },
        {

            id: "edit",
            name: "Edit",
            cell: (row) =>
            (
                <AiFillEdit style={{ color: "87CEFA" }} onClick={() => editMedicine(row.id)}></AiFillEdit>
            ),
            style: {
                fontSize: '20px',
                background: '#F3F3F3',
            },
        },
        {

            id: "delete",
            name: "Delete",
            cell: (row) =>
            (
                <AiFillDelete style={{ color: "red" }} onClick={() => deleteMedicine(row.id)}></AiFillDelete>
            ),
            style: {
                background: '#F3F3F3',
                fontSize: '20px',
            },
        }
    ]
    const deleteMedicine = async (id) => {
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
                const data = fetch(`http://localhost:5000/Medicine/${id}`, { method: 'delete' })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload(true)
            }
        })


        fetchMedicineDetails();
    }

    const editMedicine = async (id) => {
        const data = await fetch(`http://localhost:5000/Medicine/${id}`)
        const response = await data.json();
        console.log(response)
        navigate("/addmedicine", { state: { addmedicine: response } })
    }

    useEffect(() => {
        if (search == "") {
            fetchMedicineDetails();
        }
        else {
            let filtered = medicineView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
            setmedicineView(filtered)
        }
    }, [search]
    )
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View All Medicines"
                                columns={columns}
                                data={medicineView}
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

export default ViewAllMedicines
