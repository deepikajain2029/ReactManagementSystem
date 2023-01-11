import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles.css";

const ViewAllDoctors = () => {
  const [search, SetSearch] = useState("");
  const [doctorView, setdoctorView] = useState([]);
  const navigate = useNavigate();
  const fetchDoctorDetails = async () => {
      const data = await fetch("http://localhost:5000/doctor")
      const parsedData = await data.json()
      setdoctorView(parsedData)
    }
  const columns = [
     
      {
          id: "doctname",
          name: "Doctors",
          selector: (row) => row.name,
          sortable: true,
      },
      {
          id: "sepicalist",
          name: "Sepicalist",
          selector: (row) => row.specialist,
          sortable: true,
      },
      {   id: "degree",
          name: "Degree",
          selector: (row) => row.degree,
          sortable: true,
      },
      {
          id: "mobile",
          name: "Mobile",
          selector: (row) => row.mobile,
          sortable: true,
      },
      {
          id: "email",
          name: "Email",
          selector: (row) => row.doctoremailaddress,
          sortable: true,
      },
     
      {
          id: "edit",
          name:"Edit",
          cell:(row)=>
          (
              <AiFillEdit onClick={() => editDoctor(row.id)}></AiFillEdit>
          ),
      },
      {
          id: "delete",
          name:"Delete",
          cell:(row)=>
          (
              <AiFillDelete onClick={() => deleteDoctor(row.id)}></AiFillDelete>
          ),
      }
  ]
  const editDoctor = async (id) => {
      const data = await fetch(`http://localhost:5000/doctor/${id}`)
      const response = await data.json();
      navigate("/adddoctor", { state: { adddoctor: response } })
    }
    const deleteDoctor = async (id) => {
      const data = await fetch(`http://localhost:5000/doctor/${id}`, { method: 'delete' })
      fetchDoctorDetails();
    }
  useEffect(() => {
      fetchDoctorDetails();
  }, []
  );
  useEffect(()=>
  {
      let filtered = doctorView.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
      setdoctorView(filtered)
  },[search] 
  )
  return (
      <div className="sb-nav-fixed">
          <div className="container " >
              <div id="layoutSidenav">
                  <div id="layoutSidenav_content">
                      <div className="row">
                          <DataTable title="View All Doctors"
                              columns={columns}
                              data={doctorView}
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
  );
}

export default ViewAllDoctors