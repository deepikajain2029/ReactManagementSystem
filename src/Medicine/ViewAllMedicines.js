import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

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

            name: "Name",

            selector: (row) => row.name,

            sortable: true,

        },

        {

            name: "Edit",

            cell: (row) =>

            (

                <AiFillEdit onClick={() => editMedicine(row.id)}></AiFillEdit>

            ),

        },

        {

            name: "Delete",

            cell: (row) =>

            (

                <AiFillDelete onClick={() => deleteMedicine(row.id)}></AiFillDelete>

            ),

        }

    ]
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

    useEffect(() => {

        fetchMedicineDetails();

    }, []

    );

    useEffect(() => {

        let filtered = medicineView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

        setmedicineView(filtered)

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

export default ViewAllMedicines
