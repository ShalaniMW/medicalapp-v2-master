import React, { Component } from 'react';
import PatientService from '../../../Services/PatientService';
import * as moment from 'moment';

class CreatePatientComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

            name:'',
            nic:'',
            address:'',
            phone:'',
            email:'',
            gender:'',
            dob:'',
            serveType:'',
            date:'',
            payment:''
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeNICHandler=this.changeNICHandler.bind(this);
        this.changeAddressHandler=this.changeAddressHandler.bind(this);
        this.changePhoneHandler=this.changePhoneHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeGenderHandler=this.changeGenderHandler.bind(this);
        this.changeDOBHandler=this.changeDOBHandler.bind(this);
        this.changeServeTypeHandler=this.changeServeTypeHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changePaymentHandler=this.changePaymentHandler.bind(this);

        this.savePatient = this.savePatient.bind(this);
    }

    savePatient = (p) => {
        p.preventDefault();


        
        if(this.state.name === ''|| this.state.nic === ''|| this.state.address === ''|| this.state.gender === ''
        || this.state.dob === ''|| this.state.serveType === ''|| this.state.phone === ''|| this.state.email === ''|| this.state.payment === ''
        || this.state.date === '' )
        {
            alert("Please fill all the fields....")
            return;
        }
        if(!this.isNicValid(this.state.nic))
        {
            alert("Please enter a valid NIC");
            return;
        }
        if(this.state.phone.length != 10)
        {
            alert("Please enter a valid phone Number");
            return;
        }

        if(!this.isEmailValid(this.state.email))
        {
            alert("Please enter a valid Email");
            return;
        }



        let patient = {name:this.state.name,nic:this.state.nic,address:this.state.address,
            phone:this.state.phone,email:this.state.email,gender:this.state.gender,
            dob:this.state.dob,serveType:this.state.serveType,date:this.state.date,payment:this.state.payment};

                  
      
        console.log('patient =>' + JSON.stringify(patient));
        PatientService.createPatient(patient).then(res =>{
            this.props.history.push('/extuser/patients');});
        
        };
   
    changeNameHandler= (event) =>{
        this.setState({name: event.target.value});
    }
    changeNICHandler= (event) =>{
        this.setState({nic: event.target.value});
    }
    changeAddressHandler= (event) =>{
        this.setState({address: event.target.value});
    }
    changePhoneHandler= (event) =>{
        this.setState({phone: event.target.value});
    }
    changeEmailHandler= (event) =>{
        this.setState({email: event.target.value});
    }
    changeGenderHandler= (event) =>{
        this.setState({gender: event.target.value});
    }
    changeDOBHandler= (event) =>{
        this.setState({dob: event.target.value});
    }
    changeServeTypeHandler= (event) =>{
        this.setState({serveType: event.target.value});
    }
    changeDateHandler= (event) =>{
        this.setState({date: event.target.value});
    }
    changePaymentHandler= (event) =>{
        this.setState({payment: event.target.value});
    }

    cancel(){
        this.props.history.push('/extuser/patients');
    }
    isEmailValid = (email) =>{
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //var address = document.getElementById[email].value;
        return (reg.test(email));
       
    }
    isNicValid = (nic) =>{

        return (nic.includes('v')) || (nic.includes('V')); 
    }

    render() {
        const {serveType} = this.state;
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className= "text-center">Add New Patient</h3>
                            <div className="card-body">
                                <form>
                                    <div className = "form-group">
                            
                                        <input placeholder="Name" name="name" className="form-control" 
                                        value={this.state.name} onChange={this.changeNameHandler}required/>
                                    </div>
                                    <div className = "form-group">
                
                                        <input placeholder="NIC" maxlength="10" name="nic" className="form-control" 
                                        value={this.state.nic} onChange={this.changeNICHandler}required/>
                                    </div>
                                    <div className = "form-group">
                    
                                        <input placeholder="Address" name="address" className="form-control" 
                                        value={this.state.address} onChange={this.changeAddressHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                        
                                        <input placeholder="Phone Number"  name="phone" className="form-control" 
                                        value={this.state.phone} onChange={this.changePhoneHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                        
                                        <input type="email" placeholder="E-mail Address" name="email"className="form-control" 
                                        value={this.state.email} onChange={this.changeEmailHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                        
                                        <select value={this.state.gender} onChange={this.changeGenderHandler}
                                        name="gender" className="form-control" >
                                            <option >-Gender-</option>
                                            <option >Male</option>
                                            <option >Female</option>
                                            <option >Other</option>
                                        </select>
                                        </div>
                                        
                                    <div className = "form-group">
                                        
                                        <input type="date" placeholder="Date of Birth" name="dob" className="form-control" 
                                        value={this.state.dob} max={moment().format("YYYY-MM-DD")}
                                        onChange={this.changeDOBHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                    
                                    <label>
                                            <input 
                                                type="radio"
                                                value="Doctor Channeling"
                                                checked={serveType === "Doctor Channeling"}
                                                onChange={this.changeServeTypeHandler}/>
                                                &nbsp;Doctor Channeling 
                                        </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input 
                                                type="radio"
                                                value="Lab Tests"
                                                checked={serveType === "Lab Tests"}
                                                onChange={this.changeServeTypeHandler}/>
                                                &nbsp;Lab Tests 
                                        </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input 
                                                type="radio"
                                                value="OPD Services"
                                                checked={serveType === "OPD Services"}
                                                onChange={this.changeServeTypeHandler}/>
                                                &nbsp;OPD Services 
                                        </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input 
                                                type="radio"
                                                value="Other"
                                                checked={serveType === "Other"}
                                                onChange={this.changeServeTypeHandler}/>
                                                &nbsp;Other 
                                        </label>
                                    </div>
                                    <div className = "form-group">
                                       
                                        <input type="date" placeholder="Date" name="date" className="form-control" 
                                        value={this.state.date} min={moment().format("YYYY-MM-DD")} onChange={this.changeDateHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                    
                                        <input placeholder="Payments" name="payment" className="form-control" 
                                        value={this.state.payment} onChange={this.changePaymentHandler}required/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.savePatient}>Add</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} 
                                    style={{marginLeft: "10px"}}>Cancel</button>

                                </form>
                            </div>
                           

                        </div>


                    </div>



                </div>
            </div>
        );
    }
}

export default CreatePatientComponent;