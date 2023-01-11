import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../firbase";


const DoctorPatientHistory = () => {
    const [search, SetSearch] = useState("");
    const [patientDiseaseView, setpatientDiseaseView] = useState([]);
    const [diseaseView, setdiseaseView] = useState([]);
    const [patientView, setpatientView] = useState([]);
    const [medicineView, setmedicineView] = useState([]);
    const [doctorView, setdoctorView] = useState([]);
    const[user, loading,error]=useAuthState(auth);

    const fetchDoctors = async () => {
        const data4 = await fetch("http://localhost:5000/doctor")
        const parsedData4 = await data4.json()
        setdoctorView(parsedData4)
        console.log(doctorView);
    }
    const fetchPatientDiseaseDetails = async () => {
         const data = await fetch("http://localhost:5000/PatientDisease")
         const parsedData = await data.json()
        // if(role=="doctor")
        // {
            const emailID="deepikasharmacloud@gmail.com";
            console.log(doctorView) 
            const items1 = doctorView.filter(item => item.doctoremailaddress == emailID);  
        
           console.log(items1.id)
             const items = parsedData.filter(item => item.doctor_id == 14);   
            setpatientDiseaseView(items)
        //}
      
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

    const columns = [

        {
            id: "patientname",
            name: "Patient Name",
            selector: (row) => patientView.map((d) => { if (d.id == row.patient_id) { return (d.name) } }),
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "diseasename",
            name: "Disease",
            selector: (row) => diseaseView.map((d) => { if (d.id == row.disease_id) { return (d.name) } }),
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "diseasename",
            name: "Medicine",
            selector: (row) => medicineView.map((d) => { if (d.id == row.medicine_id) { return (d.name) } }),
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "suffdate",
            name: "Suffering Date",
            selector: (row) => row.suffering_date,
            sortable: true,
            style: {
                fontSize: '15px',
                background:'#F3F3F3'
              },
        },
        {
            id: "suffdate",
            name: "Action",
            cell:(row)=>
            (
                <Button type="variant">Prescribe Medicine</Button>
            ),
            style: {
                background:'#F3F3F3'
              },
        }
    ]
    
    useEffect(() => {
        fetchDoctors();
        fetchDisease();
        fetchPatitents();
        fetchMedicines();
        fetchPatientDiseaseDetails();
    }, []
    );
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <DataTable title="Patient History"
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

export default DoctorPatientHistory