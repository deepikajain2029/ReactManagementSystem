import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap'

const AddMedicine = () => {
    const location = useLocation()

    const [addmedicine, setaddmedicine] = useState({})

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state != null) {
            setaddmedicine(location.state.addmedicine)
        }

    }, [])
    const submitMedicineDetails = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            if (addmedicine.id > 0) {
                const requestOptions = {
                    'method': 'PUT',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        name: addmedicine.name
                    })
                }
                const data = fetch(`http://localhost:5000/Medicine/${addmedicine.id}`, requestOptions)

            }
            else {
                const requestOptions = {
                    'method': 'POST',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        name: addmedicine.name
                    })
                }
                const data = fetch(`http://localhost:5000/Medicine`, requestOptions)

            }
            navigate('/viewallmedicines');
        }
    };
    const onChangeHandler = (e) => {

        setaddmedicine({ ...addmedicine, [e.target.name]: e.target.value })
        console.log(addmedicine)
    }
    return (
        <div className="sb-nav-fixed"><br></br><br></br>
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <Form noValidate validated={validated} onSubmit={submitMedicineDetails}>
                            <h2 style={{ textAlign: 'center' }}>{location.state != null ? 'Edit Medicine' : 'Add Medicine'}</h2>
                            <Form.Group className="mb-3" controlId="formBasicMedicineName">
                                <Form.Label>Medicine Name</Form.Label>
                                <Input id="name" name="name" required type="text" value={addmedicine.name} onChange={onChangeHandler}
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

export default AddMedicine
