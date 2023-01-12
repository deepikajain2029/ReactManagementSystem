import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Input } from 'reactstrap'
import { auth } from "../firbase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddAdmin = () => {
   
    const location = useLocation()

    const [addAdmin, setaddAdmin] = useState({})
    const [adminView, setAdminView] = useState([]);

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state != null) {
            setaddAdmin(location.state.addAdmin)
        }

    }, [])
    const submitAdminDetails = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            if (addAdmin.id > 0) {
                const requestOptions = {
                    'method': 'PUT',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        adminname: addAdmin.adminname,
                        password: addAdmin.admin_password,
                        email: addAdmin.email_address,
                        address1: addAdmin.address1,
                        address2: addAdmin.address2,
                        phone: addAdmin.phone

                    })
                }
                const data = fetch(`http://localhost:5000/Admin/${addAdmin.id}`, requestOptions)

            }
            else {

                const requestOptions = {
                    'method': 'POST',
                    'headers': { "content-type": "application/json" },
                    'body': JSON.stringify({
                        adminname: addAdmin.adminname,
                        password: addAdmin.admin_password,
                        email: addAdmin.email_address,
                        address1: addAdmin.address1,
                        address2: addAdmin.address2,
                        phone: addAdmin.phone
                    })
                }

                const data = fetch(`http://localhost:5000/Admin`, requestOptions)
                try {
                    createUserWithEmailAndPassword(auth, addAdmin.email_address, addAdmin.admin_password);
                    alert('Admin created successfully...')
                } catch (error) {
                    alert(error);
                }
                const adminData = fetch(`http://localhost:5000/Admin`, requestOptions).then(adminData => adminData.json())
                    .then(adminData => {
                        if (adminData.id > 0) {
                            const roleOptions = {
                                'method': 'POST',
                                'headers': { "content-type": "application/json" },
                                'body': JSON.stringify({
                                    email_address: adminData.email,
                                    role: "admin",
                                })
                            }
                            const data = fetch(`http://localhost:5000/Roles`, roleOptions)
                        }
                    })

                navigate('/dashboard');

            }
        }
    };
    const onChangeHandler = (e) => {

        setaddAdmin({ ...addAdmin, [e.target.name]: e.target.value })
        console.log(addAdmin)
    }

    return (

        <div className="sb-nav-fixed">
            <div className="container " >
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <Form noValidate validated={validated} onSubmit={submitAdminDetails}>
                            <h2 style={{ textAlign: 'center' }}>{location.state != null ? 'Edit Admin' : 'Add Admin'}</h2>
                            <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                <Form.Label>Admin Name</Form.Label>
                                <Input id="adminname" name="adminname" required type="text" value={addAdmin.adminname} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicemail">
                                <Form.Label>Email Address</Form.Label>
                                <Input id="email_address" name="email_address" required type="email" value={addAdmin.email_address} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDoctorName">
                                <Form.Label>password </Form.Label>
                                <Input id="admin_password" name="admin_password" required type="password" value={addAdmin.admin_password} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress1">
                                <Form.Label>Address 1</Form.Label>
                                <Input id="address1" name="address1" required type="text" value={addAdmin.address1} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Input id="address2" name="address2" required type="text" value={addAdmin.address2} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Label>Phone</Form.Label>
                                <Input id="phone" name="phone" type="number" required value={addAdmin.phone} onChange={onChangeHandler}
                                    className="outline-primary" />
                            </Form.Group>

                            <div style={{ "textAlign": "right" }}>
                                <Button variant="success" type="submit" >{location.state != null ? 'Update' : 'Save'}</Button>{' '}{' '}
                                <Button variant="secondary" href='/dashboard' type="cancel">Cancel</Button>

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddAdmin