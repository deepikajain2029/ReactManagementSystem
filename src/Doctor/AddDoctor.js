import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input, Alert } from 'reactstrap'

const AddDoctor = () => {
  const location = useLocation()
  const [adddoctor, setadddoctor] = useState({})
  const [SucMessage, setSucMessage] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (location.state != null) {
      setadddoctor(location.state.adddoctor)
    }

  }, [])
  const submitDoctorDetails = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      if (adddoctor.id > 0) {
        const requestOptions = {
          'method': 'PUT',
          'headers': { "content-type": "application/json" },
          'body': JSON.stringify({
            name: adddoctor.name,
            address1: adddoctor.address1,
            address2: adddoctor.address2,
            specialist: adddoctor.specialist,
            mobile: adddoctor.mobile,
            degree: adddoctor.degree,
            doctoremailaddress: adddoctor.doctoremailaddress
          })
        }
        const data = fetch(`http://localhost:5000/doctor/${adddoctor.id}`, requestOptions)

      }
      else {
        const requestOptions = {
          'method': 'POST',
          'headers': { "content-type": "application/json" },
          'body': JSON.stringify({
            name: adddoctor.name,
            address1: adddoctor.address1,
            address2: adddoctor.address2,
            specialist: adddoctor.specialist,
            mobile: adddoctor.mobile,
            degree: adddoctor.degree,
            doctoremailaddress: adddoctor.doctoremailaddress
          })
        }
        const data = fetch(`http://localhost:5000/doctor`, requestOptions).then(data => data.json())
          .then(data => {
            if (data.id > 0) {
              const roleOptions = {
                'method': 'POST',
                'headers': { "content-type": "application/json" },
                'body': JSON.stringify({
                  email_address: data.doctoremailaddress,
                  role: "doctor",
                })
              }
              const data = fetch(`http://localhost:5000/Roles`, roleOptions)
            }
          })
      }
      setSucMessage(true);
      navigate('/viewalldoctors');
    }
  };
  const onChangeHandler = (e) => {

    setadddoctor({ ...adddoctor, [e.target.name]: e.target.value })
    console.log(adddoctor)
  }

  return (

    <div className="sb-nav-fixed">
      <div className="container " >
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <Form noValidate validated={validated} onSubmit={submitDoctorDetails}>
              <h2 style={{ textAlign: 'center' }}>{location.state != null ? 'Edit Doctor' : 'Add Doctor'}</h2>
              {SucMessage && <Alert variant="success">Doctor Saved !</Alert>}
              <Form.Group className="mb-3" controlId="formBasicDoctorName">
                <Form.Label>Doctor Name</Form.Label>
                <Input id="name" name="name" required type="text" value={adddoctor.name} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicemail">
                <Form.Label>Email Address</Form.Label>
                <Input id="doctoremailaddress" name="doctoremailaddress" required type="email" value={adddoctor.doctoremailaddress} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress1">
                <Form.Label>Address 1</Form.Label>
                <Input id="address1" name="address1" required type="text" value={adddoctor.address1} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress2">
                <Form.Label>Address 2</Form.Label>
                <Input id="address2" name="address2" required type="text" value={adddoctor.address2} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSpecialist">
                <Form.Label>Specialist</Form.Label>
                <Input id="specialist" name="specialist" required type="text" value={adddoctor.specialist} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile</Form.Label>
                <Input id="mobile" name="mobile" type="number" required value={adddoctor.mobile} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDegree">
                <Form.Label>Degree</Form.Label>
                <Input id="degree" name="degree" type="text" required value={adddoctor.degree} onChange={onChangeHandler}
                  className="outline-primary" />
              </Form.Group>
              <div style={{ "textAlign": "left" }}>
                <Button variant="primary" type="submit" >{location.state != null ? 'Update' : 'Save'}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDoctor