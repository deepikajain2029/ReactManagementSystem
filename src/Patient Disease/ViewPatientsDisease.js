import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles.css";

const ViewPatientsDisease = () => {

    const [search, SetSearch] = useState("");
    const [patientDiseaseView, setpatientDiseaseView] = useState([]);
    const [diseaseView, setdiseaseView] = useState([]);
    const [patientView, setpatientView] = useState([]);
    const [medicineView, setmedicineView] = useState([]);
    const [doctorView, setdoctorView] = useState([]);
    const navigate = useNavigate();

    const fetchPatientDiseaseDetails = async () => {
        const data = await fetch("http://localhost:5000/PatientDisease")
        const parsedData = await data.json()
        setpatientDiseaseView(parsedData)
    }
    const fetchPatitents = async () => {
        const data2 = await fetch("http://localhost:5000/Patient")
        const parsedData2 = await data2.json()
        setpatientView(parsedData2)
    }
    const fetchDisease = async () => {
        const data1 = await fetch("http://localhost:5000/Disease")
        const parsedData1 = await data1.json()
        setdiseaseView(parsedData1)
    }
    const fetchMedicines = async () => {
        const data3 = await fetch("http://localhost:5000/Medicine")
        const parsedData3 = await data3.json()
        setmedicineView(parsedData3)
    }
    const fetchDoctors = async () => {
        const data = await fetch("http://localhost:5000/doctor")
        const parsedData = await data.json()
        setdoctorView(parsedData)
    }
    const columns = [

        {
            id: "patientname",
            name:"Patient Name",
            selector: (row) => patientView.map((d) => {if(d.id==row.patient_id){ return (d.name)}}),
            sortable: true,
            style: {
                fontSize: '14px'
               
            },
        },
        {
            id: "diseasename",
            name: "Disease Name",
            selector: (row) => diseaseView.map((d) => { if (d.id == row.disease_id) { return (d.name) } }),
            sortable: true,
            style: {
                fontSize: '14px', 
            },
        },
        {
            id: "suffdate",
            name: "Suffering Date",
            selector: (row) => row.suffering_date,
            sortable: true,
            style: {
                fontSize: '14px', 
            },
        },
        {
            id: "mediciname",
            name: "Medicine Name",
            selector: (row) => medicineView.map((d) => { if (d.id == row.medicine_id) { return (d.name) } }),
            sortable: true,
            style: {
                fontSize: '14px', 
            },
        },
        {
            id: "doctname",
            name: "Doctor Name",
            selector: (row) => doctorView.map((d) => { if (d.id == row.doctor_id) { return (d.name) } }),
            sortable: true,
        },
        {
            name: "Delete",
            cell: (row) =>
            (
                <AiFillDelete onClick={() => deletePatientDisease(row.id)}></AiFillDelete>
            ),
        }
    ]
      
    
    useEffect(() => {
        if (search == "") {
            fetchPatientDiseaseDetails();
            fetchPatitents();
            fetchDisease();
            fetchMedicines();
            fetchDoctors();
        }
        else {
          
            let filtered = (doctorView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) 
             
            ))
         
        }

    }, [search]
    );
    const deletePatientDisease = async (id) => {
        const data = await fetch(`http://localhost:5000/PatientDisease/${id}`, { method: 'delete' })
        fetchPatientDiseaseDetails();
    }
   
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