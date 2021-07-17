import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';

class UpdateSupplierComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

            id: this.props.match.params.Id,
            sName:'',
            sAddress:'',
            sNumber:'',
            drugType:''
        }
        this.changesNameHandler=this.changesNameHandler.bind(this);
        this.changesAddressHandler=this.changesAddressHandler.bind(this);
        this.changesNumberHandler=this.changesNumberHandler.bind(this);
        this.changedrugTypeHandler=this.changedrugTypeHandler.bind(this);
       

        this.updateSupplier = this.updateSupplier.bind(this);
    }

    componentDidMount(){
        SupplierService.getSupplierById(this.state.id).then( (res) =>{
            let supplier = res.data;
            this.setState({
                sName: supplier.sName,
                sAddress: supplier.sAddress,
                sNumber: supplier.sNumber,
                drugType: supplier.drugType
           
            });
        }).catch(err => {
            // alert(err);
        });
    
    }

    updateSupplier = (s) => {
        s.preventDefault();


        if(this.state.sName === ''|| this.state.sAddress === ''|| this.state.sNumber === ''
        || this.state.drugType === '' )
        {alert("Please fill all the fields....")
                return;
    
        }

        let supplier = {sName:this.state.sName,sAddress:this.state.sAddress,
            sNumber:this.state.sNumber,drugType:this.state.drugType
        };
        
        
                    console.log('supplier =>' + JSON.stringify(supplier));
            SupplierService.updateSupplier(supplier, this.state.id).then(res =>{
                this.props.history.push('/extuser/suppliers');});
            };
    


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
                            <h3 className= "text-center">Update Supplier</h3>
                            <div className="card-body">
                                <form>

                                <div className = "form-group">
                            
                            <input placeholder="SupplierID" name="sId" className="form-control" 
                            value={this.state.id} />
                        </div>
                        
                                <div className = "form-group">
                            
                            <input placeholder="Supplier/Company name" name="sName" className="form-control" 
                            value={this.state.sName} onChange={this.changesNameHandler}required/>
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

                                    <button className="btn btn-success" onClick={this.updateSupplier}>Save Changes</button>
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

export default UpdateSupplierComponent;