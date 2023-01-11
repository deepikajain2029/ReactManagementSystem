import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap'
import { auth } from "../firbase";
import {createUserWithEmailAndPassword} from "firebase/auth"; 
import Swal from 'sweetalert2'

const AddPatient = () => {
  const location = useLocation()

  const [addPatient, setaddPatient] = useState({})
  const [roleView, setRoleView] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setaddPatient({ ...addPatient, [e.target.name]: e.target.value })
    console.log(addPatient)
  }
  useEffect(() => {
    if (location.state != null) {
      setaddPatient(location.state.addPatient)
    }
    fetchRoles();
  }, [])
  const fetchRoles = async () => {
    const data1 = await fetch("http://localhost:5000/Roles")
    const parsedData1 = await data1.json()
    setRoleView(parsedData1)
  }
  const submitPatientDetails = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      if (addPatient.id > 0) {
        const requestOptions = {
          'method': 'PUT',
          'headers': { "content-type": "application/json" },
          'body': JSON.stringify({
            name: addPatient.name,
            email: addPatient.email,
            address1: addPatient.address1,
            address2: addPatient.address2,
            mobile: addPatient.mobile

          })
        }
        const data = fetch(`http://localhost:5000/Patient/${addPatient.id}`, requestOptions);
        Swal.fire({
          title: 'Patient updated successfully...',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        navigate('/viewallpatients');
      }
      else {
        //To Check if email id already exists in role table 
        const items = roleView.filter(item => item.email_address == addPatient.email);
        if (items.length > 0) {

          alert("email already exists")
          event.preventDefault();
        }
        else{
          const requestOptions = {
            'method': 'POST',
            'headers': { "content-type": "application/json" },
            'body': JSON.stringify({
              name: addPatient.name,
              email: addPatient.email,
              address1: addPatient.address1,
              address2: addPatient.address2,
              mobile: addPatient.mobile
            })
          }
          const data = fetch(`http://localhost:5000/Patient`, requestOptions).then(data => data.json())
            .then(data => {
              if (data.id > 0) {
                const roleOptions = {
                  'method': 'POST',
                  'headers': { "content-type": "application/json" },
                  'body': JSON.stringify({
                    email_address: addPatient.email,
                    role: "patient",
                  })
                }
                const data = fetch(`http://localhost:5000/Roles`, roleOptions)
              
              }
              try {
                createUserWithEmailAndPassword(auth, addPatient.email, "abc123");
              
                Swal.fire({
                  title: 'Patient created successfully...',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
              } catch (error) {
                alert(error);
              }
            })
            navigate('/viewallpatients');
        }
       

      }

    
    }
  };
  

  return (

    <div className="sb-nav-fixed">
      <div className="container " >
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <Form noValidate validated={validated} onSubmit={submitPatientDetails}>
              <h2 style={{ textAlign: 'center' }}>{location.state != null ? 'Edit Patient' : 'Add Patient'}</h2>
              <Form.Group className="mb-3" controlId="formBasicDoctorName">
                <Form.Label>Patient Name</Form.Label>
                <Input id="name" name="name" required type="text" value={addPatient.name} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicemail">
                <Form.Label>Email Address</Form.Label>
                <Input id="email" name="email" required type="email" disabled={location.state != null ? true : false}  value={addPatient.email} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress1">
                <Form.Label>Address 1</Form.Label>
                <Input id="address1" name="address1" required type="text" value={addPatient.address1} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress2">
                <Form.Label>Address 2</Form.Label>
                <Input id="address2" name="address2" required type="text" value={addPatient.address2} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile</Form.Label>
                <Input id="mobile" name="mobile" type="number" required value={addPatient.mobile} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>

              <div style={{ "textAlign": "left" }}>
                <Button variant="primary" type="submit" >{location.state != null ? 'Update' : 'Save'}</Button>{'   '}
                <Button variant="secondary" onClick={() => navigate('/viewallpatients')}>Cancel</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddPatient