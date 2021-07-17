import React, { Component } from 'react';
import PatientService from '../../../Services/PatientService';

function searchingFor(term){
    return function(x){
        return x.nic.toLowerCase().includes(term.toLowerCase()) || !term;
        }
}
class ListPatientComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

                patients: [],
                term:''
        }
        this.addPatient = this.addPatient.bind(this);
        this.editPatient = this.editPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

        deletePatient = (id) => {
            PatientService.deletePatient(id).then( res => {
                
                PatientService.getPatients().then((res) => {
                    this.setState({ patients: res.data});
                });
            });
        }

        editPatient = (id) =>
        {
            this.props.history.push(`/extuser/update-patient/${id}`);
        }

        componentDidMount(){
            PatientService.getPatients().then((res) => {
                this.setState({ patients: res.data});
            });
        }
        
        addPatient(){
            this.props.history.push('/extuser/add-patient');
        }

        searchHandler(event){
            this.setState({term: event.target.value})
        }

    render() {
        const {term,term1,patients} = this.state;
        return (
            <div>
                <h2 className="text-center">Patient Details</h2>
                <div className="row">
                <form><input style={{marginLeft:"10px"}}type="text" placeholder="Search..." onChange={this.searchHandler} value={term}/></form>
                
                <form style={{marginLeft:"700px"}}><button   style={{marginBottom:"10px"}} className="btn btn-primary" 
                onClick={this.addPatient}>Add Patient</button></form>
                 
                    
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NIC</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>E-mail</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Payment</th>
                                <th>Option</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.patients.filter(searchingFor(this.state.term)).map(
                                    patient=>
                                    <tr key = {patient.patientId}>
                                        <td>{patient.name}</td>
                                        <td>{patient.nic}</td>
                                        <td>{patient.address}</td>
                                        <td>{patient.phone}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.dob}</td>
                                        <td>{patient.serveType}</td>
                                        <td>{patient.date}</td>
                                        <td>{patient.payment}</td>
                                        <td><button style={{marginRight:"5px"}} onClick = {()=> this.editPatient(patient.patientId)} className="btn btn-info">Update</button>
                                        &nbsp;<button style={{marginTop:"10px"}} onClick = {()=> this.deletePatient(patient.patientId)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )


                            }
                        </tbody>
                     </table>
                </div>   
                
            </div>
        );
    }
}

export default ListPatientComponent;