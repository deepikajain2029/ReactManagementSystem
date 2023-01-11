import React, { useEffect, useState } from 'react'
import { Input, Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddPatientDisease = () => {
    const [doctorView, setdoctorView] = useState([]);
    const [diseaseView, setdiseaseView] = useState([]);
    const [patientView, setpatientView] = useState([]);
    const [medicineView, setmedicineView] = useState([]);
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [diseaseId, setdiseaseId] = useState([]);
    const [patientId, setPatientId] = useState([]);
    const [medicineId, setMedicineId] = useState([]);
    const [suffDate, setsuffDate] = useState('');
    const[insertedMedicineId,setMedId]=useState([]);

    const [showDiseaseTxt, setshowDiseaseTxt] = useState(false);
    const [showMedicineTxt, setshowMedicineTxt] = useState(false);
    const fetchDoctors = async () => {
        const data = await fetch("http://localhost:5000/doctor")
        const parsedData = await data.json()
        setdoctorView(parsedData)
    }
    const fetchDisease = async () => {
        const data1 = await fetch("http://localhost:5000/Disease")
        const parsedData1 = await data1.json()
        setdiseaseView(parsedData1)
    }
    const fetchPatitents = async () => {
        const data2 = await fetch("http://localhost:5000/Patient")
        const parsedData2 = await data2.json()
        setpatientView(parsedData2)
    }
    const fetchMedicines = async () => {
        const data3 = await fetch("http://localhost:5000/Medicine")
        const parsedData3 = await data3.json()
        setmedicineView(parsedData3)
    }
    useEffect(() => {
        fetchDoctors()
        fetchDisease()
        fetchPatitents()
        fetchMedicines()
    }, [])

    const OnDoctorChange = (e) => {
        setState({ doctorId: e.target.value });
    }
    const OnDiseaseChange = (e) => {
        if (e.target.value == "0") {
            setshowDiseaseTxt(true);
        }
        else {
            setshowDiseaseTxt(false);
        }
        setdiseaseId({ diseaseId: e.target.value });
    }
    const OnPatientChange = (e) => {
        setPatientId({ patientId: e.target.value });
    }
    const OnMedicineChange = (e) => {
        setMedicineId({ medicineId: e.target.value });
    }


    const dateChange = (event) => {
        setsuffDate(event.target.value);
    };
    const submitDetails = () => {
     
        //to check if disease is other
        if (diseaseId.diseaseId == "0") {
            const otherDisName = document.getElementById('diseasename').value
            const requestOptions1 = {
                'method': 'POST',
                'headers': { "content-type": "application/json" },
                'body': JSON.stringify({
                    name: otherDisName
                })
            }
          
            const data = fetch(`http://localhost:5000/Disease`, requestOptions1).then(data => data.json())
                .then(data => {
                    if (data.id > 0) {
                        const insertedDiseaseId = data.id
                        if (insertedDiseaseId > 0 ) {
                            alert(insertedDiseaseId);
                            const requestOptions = {
                                'method': 'POST',
                                'headers': { "content-type": "application/json" },
                                'body': JSON.stringify({
                                    doctor_id: state.doctorId,
                                    disease_id: insertedDiseaseId,
                                    patient_id: patientId.patientId,
                                    suffering_date: suffDate,
                                    medicine_id: medicineId.medicineId,
                                })
                            }
                            const data = fetch(`http://localhost:5000/PatientDisease`, requestOptions)
                       }
                    }
                })
        }

        else {
            const requestOptions = {
                'method': 'POST',
                'headers': { "content-type": "application/json" },
                'body': JSON.stringify({
                    doctor_id: state.doctorId,
                    disease_id: diseaseId.diseaseId,
                    patient_id: patientId.patientId,
                    suffering_date: suffDate,
                    medicine_id: medicineId.medicineId,
                })
            }
            const data = fetch(`http://localhost:5000/PatientDisease`, requestOptions)
        }
        Swal.fire({
            title: 'Patient Disease added successfully...',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        navigate('/viewpatientdisease');
       
    };
    return (
        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <div className="row">
                            <Form onSubmit={submitDetails}>
                                <h2 style={{ textAlign: 'center' }}>Add Patient Disease</h2>
                                <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                    <Form.Label>Patient Name</Form.Label>
                                    <div className='form-group'>
                                        <select name="PatientName" required className="form-control" value={state.patientId} onChange={OnPatientChange}>
                                            <option value="">--Please choose a patient--</option>
                                            {patientView.map((pct) => {
                                                return <option value={pct.id}>{pct.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Disease Name</Form.Label>
                                    <div className='form-group'>
                                        <select name="DiseaseName" required className="form-control" value={state.diseaseId} onChange={OnDiseaseChange}>
                                            <option value="">--Please choose a disease--</option>
                                            {diseaseView.map((dst) => {
                                                return <option value={dst.id}>{dst.name}</option>
                                            })}
                                            <option value="0">Other</option>
                                        </select>
                                    </div>
                                    <div className='form-group mt-2' >
                                        {showDiseaseTxt && <Input id="diseasename" required name="diseasename" type="text" placeholder='Please type here...'
                                            className="outline-primary" />}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                    <Form.Label>Doctor Name</Form.Label>
                                    <div className='form-group'>
                                        <select name="DoctorName" required className="form-control" value={state.doctorId} onChange={OnDoctorChange}>
                                            <option value="">--Please choose a doctor--</option>
                                            {doctorView.map((dct) => {
                                                return <option value={dct.id}>{dct.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                    <Form.Label>Suffering Date</Form.Label>
                                    <div className='form-group'>
                                        <Input id="sufferDate" name="sufferDate" onChange={dateChange} required type="date" className="outline-primary" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                    <Form.Label>Medicine Name</Form.Label>
                                    <div className='form-group'>
                                        <select name="MedicineName" required className="form-control" value={state.medicineId} onChange={OnMedicineChange}>
                                            <option value="">--Please choose a medicine--</option>
                                            {medicineView.map((med) => {
                                                return <option value={med.id}>{med.name}</option>
                                            })}
                                           
                                        </select>
                                    </div>
                                </Form.Group>
                                <div>
                                    <Button variant="primary" type="submit" >Save</Button>{'   '}
                                    <Button variant="secondary" onClick={() => navigate('/viewpatientdisease')}>Cancel</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPatientDisease