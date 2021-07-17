import React, { Component } from 'react';
import PatientService from '../../../Services/PatientService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function searchingForDate(term1){
    return function(x){
        return x.date.toLowerCase().includes(term1.toLowerCase()) || !term1;
        }
}

class ListPComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

                patients: [],
                term1:''
                
                
        }
         
        this.searchHandlerDate = this.searchHandlerDate.bind(this); 
    }
    

        componentDidMount(){
            
            PatientService.getPatients().then((res) => {
                
                this.setState({ patients: res.data});
            });
        }
        
    
        searchHandlerDate(event){
            this.setState({term1: event.target.value})
        }
        capture = () =>{

            html2canvas(document.querySelector("#capture")).then(canvas => {

                this.printdiv("capture");

                
            });
        }
        printdiv = (printdivname) => {
            var headstr = "<html><head><title>Booking Details</title></head><body>";
            var footstr = "</body>";
            var newstr = document.getElementById(printdivname).innerHTML;
            var oldstr = document.body.innerHTML;
            document.body.innerHTML = headstr + newstr + footstr;
            window.print();
            document.body.innerHTML = oldstr;
            return false
        }

    render() {
        
        const {term,term1,patients} = this.state;
        return (
            <div>
                <h2 className="text-center">Patient Records</h2>
                <div className="row">
                    
                    
                    <form><input type="text" placeholder=" Search Date......" style={{marginBottom:"10px"}} 
                    onChange={this.searchHandlerDate} value={term1}/></form>
                </div>
                <div >
                    <div   className = "row" id="capture">

                  
                    <table className = "table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NIC</th>
                                <th>Contact No:</th>
                                <th>Gender</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Payments</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                
                                    this.state.patients.filter(searchingForDate(this.state.term1)).map(
                                    patient=>
                                    <tr key = {patient.patientId}>
                                        <td>{patient.name}</td>
                                        <td>{patient.nic}</td>
                                        <td>{patient.phone}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.serveType}</td>
                                        <td>{patient.date}</td>
                                        <td>{patient.payment}</td>       
                                    </tr>
                                )         
                                    
                            }
                        </tbody>
                     </table>
                     </div>

                     <button onClick={()=> this.capture()} className="btn btn-primary">Print/Save</button>
                </div>   
                
            </div>
        );
    }
}

export default ListPComponent;