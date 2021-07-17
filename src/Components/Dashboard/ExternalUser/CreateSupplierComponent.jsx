import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';


class CreateSupplierComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

            sName:'',
            sAddress:'',
            sNumber:'',
            drugType:''
            
        }
        this.changesNameHandler=this.changesNameHandler.bind(this);
        this.changesAddressHandler=this.changesAddressHandler.bind(this);
        this.changesNumberHandler=this.changesNumberHandler.bind(this);
        this.changedrugTypeHandler=this.changedrugTypeHandler.bind(this);
       
        this.saveSupplier = this.saveSupplier.bind(this);
    }

    saveSupplier = (s) => {
        s.preventDefault();
        let supplier = {sName:this.state.sName,sAddress:this.state.sAddress,
            sNumber:this.state.sNumber,drugType:this.state.drugType};

        if(this.state.sName === ''|| this.state.sAddress === ''|| this.state.sNumber === ''
        || this.state.drugType === '' )
        {alert("Please fill all the fields....")}
                  
        else{
            
        console.log('supplier =>' + JSON.stringify(supplier));
        SupplierService.createSupplier(supplier).then(res =>{
            
            this.props.history.push('/extuser/suppliers');});
            
        };
    }
   
    changesNameHandler= (event) =>{
        this.setState({sName: event.target.value});
    }
    changesAddressHandler= (event) =>{
        this.setState({sAddress: event.target.value});
    }
    changesNumberHandler= (event) =>{
        this.setState({sNumber: event.target.value});
    }
    changedrugTypeHandler= (event) =>{
        this.setState({drugType: event.target.value});
    }
    

    cancel(){
        this.props.history.push('/extuser/suppliers');
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className= "text-center">Add New Supplier</h3>
                            <div className="card-body">
                                <form>
                                    <div className = "form-group">
                            
                                        <input placeholder="Supplier/Company name" name="sName" className="form-control" 
                                        value={this.state.sName} onChange={this.changesNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                    
                                        <input placeholder="Address" name="sAddress" className="form-control" 
                                        value={this.state.sAddress} onChange={this.changesAddressHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                        
                                        <input placeholder="Contact Number" maxlength="10" name="sNumber" className="form-control" 
                                        value={this.state.sNumber} onChange={this.changesNumberHandler}required/>
                                    </div>
                                    <div className = "form-group">
                                        
                                        <select value={this.state.drugType} onChange={this.changedrugTypeHandler}
                                        name="drugType"className="form-control" >
                                            <option>-Drug Type-</option>
                                            <option>DS664</option>
                                            <option>DS890</option>
                                            <option>DA308</option>
                                            <option>DA566</option>
                                            <option>D1882</option>
                                            <option>D2347</option>
                                            <option>D7888</option>
                                            <option>DZ123</option>
                                            </select>
                                    </div>
                                    
                                    
                                    <button className="btn btn-success" onClick={this.saveSupplier}>Add</button>
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

export default CreateSupplierComponent;