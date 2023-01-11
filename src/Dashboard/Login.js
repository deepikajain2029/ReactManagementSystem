import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const today = new Date();
    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        const data = await fetch("http://localhost:5000/Roles")
        const response = await data.json();
        setRoles(response)

    }
    const items = roles.filter(item => item.email_address == email);
    const Signin = () => {
        if (!email || !password) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");
        signInWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
               getRoles();
                window.$role = items[0].role;
    
                if (window.$role === 'admin') {
                navigate("/dashboard");
                }
                else if(window.$role === 'doctor')
                {
                    navigate("/viewdoctorpatienthistory");
                }
                else if(window.$role === 'patient')
                {
                    navigate("/patientdiseasehistory");
                }
            })
            .catch((err) => {
                setErrorMsg("You have entered wrong credential");
            });

    };
    useEffect(() => {

        getRoles();

    }, []

    );
    return (
        <div className="" style={{ "background-color": "blue" }}>

            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" onChange={(event) => setEmail(event.target.value)} id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label for="inputEmail">Email address</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" onChange={(event) => setPassword(event.target.value)} id="inputPassword" type="password" placeholder="Password" />
                                                    <label for="inputPassword">Password</label>
                                                </div>
                                                <div className="text-center">
                                                    <b className="error">{errorMsg}</b><br />
                                                    <button type="button" onClick={Signin} className="btn btn-primary">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"><a href="register.html"></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-left justify-content-between small">
                                <div className="text-muted">© {today.getFullYear()} Patient Management System. All Rights Reserved.</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Login