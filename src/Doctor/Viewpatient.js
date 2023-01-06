import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
const Viewpatient = () => {
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
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Sepcialist",
            selector: (row) => row.specialist,
            sortable: true,
        },
        {
            name: "Degree",
            selector: (row) => row.degree,
            sortable: true,
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.doctoremailaddress,
            sortable: true,
        },
       
        {
            name:"Action",
            cell:(row)=>
            (
                <AiFillEdit onClick={() => editDoctor(row.id)}></AiFillEdit>
                
            // <button className='btn btn-primary' onClick={()=>alert(row.alpha2Code)}>Edit</button>
            

            ),
        }
    ]
    const editDoctor = async (id) => {
        const data = await fetch(`http://localhost:5000/doctor/${id}`)
        const response = await data.json();
        navigate("/adddoctor", { state: { adddoctor: response } })
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
                              
                                subHeaderComponent={<input type="text" placeholder='search by name' className='w-20 form-Control'
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

export default Viewpatient