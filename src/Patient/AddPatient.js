import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap'

const AddPatient = () => {
    const location = useLocation()

    const [addPatient, setaddPatient] = useState({})
  
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (location.state != null) {
        setaddPatient(location.state.addPatient)
      }
  
    }, [])
    const submitPatientDetails = (event) => {
      const form = event.currentTarget;
      console.log(form.checkValidity())
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
              email:addPatient.email,
              address1: addPatient.address1,
              address2: addPatient.address2,
              mobile: addPatient.mobile
              
            })
          }
          const data= fetch(`http://localhost:5000/Patient/${addPatient.id}`, requestOptions)
          
        }
        else {
          const requestOptions = {
            'method': 'POST',
            'headers': { "content-type": "application/json" },
            'body': JSON.stringify({
                name: addPatient.name,
                email:addPatient.email,
                address1: addPatient.address1,
                address2: addPatient.address2,
                mobile: addPatient.mobile
            })
          }
          const data = fetch(`http://localhost:5000/Patient`, requestOptions)
          
        }
        
        navigate('/viewalldoctors');
      }
    };
    const onChangeHandler = (e) => {
  
      setaddPatient({ ...addPatient, [e.target.name]: e.target.value })
      console.log(addPatient)
    }
  
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
                  <Input id="dpatientemailaddress" name="patientemailaddress" required type="email" value={addPatient.doctoremailaddress} onChange={onChangeHandler}
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
                
                <div style={{ "textAlign": "center" }}>
                  <Button variant="primary" type="submit" >{location.state != null ? 'Update' : 'Submit'}</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
export default AddPatient