import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap'

const AddDisease = () => {

    const location = useLocation()

    const [adddisease, setadddisease] = useState({})

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state != null) {
            setadddisease(location.state.adddisease)
        }

    }, [])
    const submitDiseaseDetails = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            if (adddisease.id > 0) {
                const requestOptions = {
                    'method': 'PUT',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        name: adddisease.name
                    })
                }
                const data = fetch(`http://localhost:5000/Disease/${adddisease.id}`, requestOptions)

            }
            else {
                const requestOptions = {
                    'method': 'POST',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        name: adddisease.name
                    })
                }
                const data = fetch(`http://localhost:5000/Disease`, requestOptions)

            }
            navigate('/viewalldiseases');
        }
    };
    const onChangeHandler = (e) => {

        setadddisease({ ...adddisease, [e.target.name]: e.target.value })
        console.log(adddisease)
    }
    return (

        <div className="sb-nav-fixed"><br></br><br></br>
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <Form noValidate validated={validated} onSubmit={submitDiseaseDetails}>
                            <h2 style={{ textAlign: 'center' }}>{location.state != null ? 'Edit Disease' : 'Add Disease'}</h2>
                            <Form.Group className="mb-3" controlId="formBasicDiseaseName">
                                <Form.Label>Disease Name</Form.Label>
                                <Input id="name" name="name" required type="text" value={adddisease.name} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>
                            <br></br>
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

export default AddDisease
