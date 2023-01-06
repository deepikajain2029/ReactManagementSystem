import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

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

            name: "Name",

            selector: (row) => row.name,

            sortable: true,

        },

        {

            name: "Edit",

            cell: (row) =>

            (

                <AiFillEdit onClick={() => editDisease(row.id)}></AiFillEdit>

            ),

        },

        {

            name: "Delete",

            cell: (row) =>

            (

                <AiFillDelete onClick={() => deleteDisease(row.id)}></AiFillDelete>

            ),

        }

    ]
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

export default ViewAllDiseases
