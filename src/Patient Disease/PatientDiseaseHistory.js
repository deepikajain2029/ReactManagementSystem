import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

const PatientDiseaseHistory = () => {

    const [search, SetSearch] = useState("");
    const [patientDiseaseHistoryView, setpatientDiseaseHistoryView] = useState([]);
    const [doctorView, setdoctorView] = useState([]);
    const [medicineView, setmedicineView] = useState([]);
    const [diseaseView, setdiseaseView] = useState([]);
    const navigate = useNavigate();

    const fetchDiseaseDetails = async () => {

        const data = await fetch("http://localhost:5000/Disease")

        const parsedData = await data.json()

        setdiseaseView(parsedData)

    }
    const fetchMedicineDetails = async () => {

        const data = await fetch("http://localhost:5000/Medicine")
        const parsedData = await data.json()
        setmedicineView(parsedData)

    }

    const fetchDoctorDetails = async () => {
        const data = await fetch("http://localhost:5000/doctor")
        const parsedData = await data.json()
        setdoctorView(parsedData)
    }

    const fetchPatientDiseaseHistoryDetails = async () => {
        const data = await fetch("http://localhost:5000/PatientDisease")
        const parsedData = await data.json()
        setpatientDiseaseHistoryView(parsedData)
    }

    const columns = [
        {
            name: "Doctor Name",
            selector: (row) => doctorView.map((d) => {if(d.id==row.doctor_id){ return (d.name)}}),
            // selector: (row) => row.doctor_id,
            sortable: true,
        },
        {
            name: "Disease Name",
            selector: (row) => diseaseView.map((d) => {if(d.id==row.disease_id){ return (d.name)}}),
            // selector: (row) => row.disease_id,
            sortable: true,
        },
        {
            name: "Suffering Date",
            selector: (row) => row.suffering_date,
            sortable: true,
        },
        {
            name: "Medicine Name",
            selector: (row) => medicineView.map((d) => {if(d.id==row.medicine_id){ return (d.name)}}),
            // selector: (row) => row.medicine_id,
            sortable: true,
        }
        
    ]
    useEffect(() => {
        fetchPatientDiseaseHistoryDetails();
        fetchDiseaseDetails()
        fetchMedicineDetails()
        fetchDoctorDetails()
    }, []
    );
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="View Patient Disease History"
                                columns={columns}
                                data={patientDiseaseHistoryView}
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

export default PatientDiseaseHistory