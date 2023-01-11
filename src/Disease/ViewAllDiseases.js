import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import "../styles.css";
const ViewAllDiseases = () => {


    const [search, SetSearch] = useState("");
    const [diseaseView, setdiseaseView] = useState([]);
    const navigate = useNavigate();

    const fetchDiseaseDetails = async () => {
        const data = await fetch("http://localhost:5000/Disease")
        const parsedData = await data.json()
        setdiseaseView(parsedData)
    }
    const columns = [

        {

            id: "diseasename",
            name: "Disease Name",
            selector: (row) => row.name,
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
                <AiFillEdit style={{color:"87CEFA"}} onClick={() => editDisease(row.id)}></AiFillEdit>
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
                <AiFillDelete style={{color:"red"}} onClick={() => deleteDisease(row.id)}></AiFillDelete>
            ),
            style: {
                background:'#F3F3F3',
                fontSize: '20px',
              },
        }
    ]
    const deleteDisease = async (id) => {
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
                const data =  fetch(`http://localhost:5000/Disease/${id}`, { method: 'delete' })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                window.location.reload(true)
            }
        })
        

        fetchDiseaseDetails();
    }

    const editDisease = async (id) => {
        const data = await fetch(`http://localhost:5000/Disease/${id}`)
        const response = await data.json();
        console.log(response)
        navigate("/adddisease", { state: { adddisease: response } })
    }

    useEffect(() => {
        fetchDiseaseDetails();
    }, []

    );

    useEffect(() => {
        let filtered = diseaseView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        setdiseaseView(filtered)
    }, [search]

    )
    return (
        
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View All Disease"
                                columns={columns}
                                data={diseaseView}
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

export default ViewAllDiseases
