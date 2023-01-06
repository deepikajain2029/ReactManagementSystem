import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewPatientsDisease = () => {
    const [search, SetSearch] = useState("");
    const [patientDiseaseView, setpatientDiseaseView] = useState([]);
    const [patientView, setpatientView] = useState([]);
    const navigate = useNavigate();

    const fetchPatientDiseaseDetails = async () => {
        const data = await fetch("http://localhost:5000/PatientDisease")
        const parsedData = await data.json()
        setpatientDiseaseView(parsedData)
    }


    
    const columns = [

        {
            name: "Patient Name",
            selector: (row) => row.patient_id,
            sortable: true,
        },
        {
            name: "Disease Name",
            selector: (row) => row.disease_id,
            sortable: true,
        },
        {
            name: "Suffering Date",
            selector: (row) => row.suffering_date,
            sortable: true,
        },
        {
            name: "Medicine Name",
            selector: (row) => row.medicine_id,
            sortable: true,
        },
        {
            name: "Doctor Name",
            selector: (row) => row.doctor_id,
            sortable: true,
        }
    ]
    useEffect(() => {
        fetchPatientDiseaseDetails();
    }, []
    );
    return (

        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View All Patient Disease"
                                columns={columns}
                                data={patientDiseaseView}
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

export default ViewPatientsDisease