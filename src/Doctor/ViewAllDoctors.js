import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewAllDoctors = () => {
  const [doctorView, setdoctorView] = useState([]);
  const navigate = useNavigate();
  const fetchDoctorDetails = async () => {
    const data = await fetch("http://localhost:5000/doctor")
    const parsedData = await data.json()
    setdoctorView(parsedData)
  }
  const deleteDoctor = async (id) => {
    const data = await fetch(`http://localhost:5000/doctor/${id}`, { method: 'delete' })

    const response = await data.json();

    fetchDoctorDetails();
  }
  const editDoctor = async (id) => {

    const data = await fetch(`http://localhost:5000/doctor/${id}`)

    const response = await data.json();

    console.log(response)

    navigate("/adddoctor", { state: { adddoctor: response } })

  }
  const getDoctorByName=async(dctName)=>{
    console.log(dctName);
    const data=await fetch(`http://localhost:5000/doctor/${dctName}`)

     const response =await data.json();

     console.log(response)

    // navigate("/updatetodo" , {state:{todo:response}})

}
  useEffect(() => {

    fetchDoctorDetails()
  }, [])
  return (
    <div className="sb-nav-fixed">
      <div className="container " >
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <div class="row">
              <h2 class="text-center">View All Doctors</h2>
              <div className="card-header">
                <form className="d-none d-md-inline-block" >
                  <div className="input-group" >
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                  </div>
                </form>
              </div>
              <Table striped bordered hover>
                <thead style={{ "background-color": "#0d6efd" }}>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Specialist</th>
                    <th>Degree</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorView.map((adddoctor) => {
                    return <tr>
                      <td>{adddoctor.id}</td>
                      <td>{adddoctor.name}</td>
                      <td>{adddoctor.doctoremailaddress}</td>
                      <td>{adddoctor.address1}</td>
                      <td>{adddoctor.address2}</td>
                      <td>{adddoctor.specialist}</td>
                      <td>{adddoctor.degree}</td>
                      <td>{adddoctor.mobile}</td>
                      <td>
                        <AiFillEdit onClick={() => editDoctor(adddoctor.id)}></AiFillEdit>{'   '}
                        <AiFillDelete onClick={() => deleteDoctor(adddoctor.id)}></AiFillDelete></td>
                    </tr>

                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAllDoctors