import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';

function searchingFor(term){
    return function(x){
        return x.sName.toLowerCase().includes(term.toLowerCase()) || !term;
        }
}
class ListSupplierComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

                suppliers: [],
                term:''
        }
        
        this.addSupplier = this.addSupplier.bind(this);
        this.editSupplier = this.editSupplier.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

        deleteSupplier = (id) => {
            
            SupplierService.deleteSupplier(id).then( res => {

                SupplierService.getSuppliers().then((res) => {
                    this.setState({ suppliers: res.data});
                    
                });
            });
            
        }

        editSupplier = (id) =>
        {
            this.props.history.push(`/extuser/update-supplier/${id}`);
        }

        componentDidMount(){
            SupplierService.getSuppliers().then((res) => {
                this.setState({ suppliers: res.data});
            });
        }
        
        addSupplier(){
            this.props.history.push('/extuser/add-supplier');
            
        }

        searchHandler(event){
            this.setState({term: event.target.value})
        }

    render() {
        const{term,suppliers} = this.state;
        return (
            <div>
                <h2 className="text-center">Supplier Details</h2>
                <div className="row">
                <form><input style={{marginLeft:"10px"}}type="text" placeholder="Search..." onChange={this.searchHandler} value={term}/></form>
                
                    <form style={{marginLeft:"700px"}}><button   style={{marginBottom:"10px"}} className="btn btn-primary" 
                    onClick={this.addSupplier}>Add Supplier</button></form>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Supplier/Brand Name</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>Drug Types Sell</th>
                                <th>Update/Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.suppliers.filter(searchingFor(this.state.term)).map(
                                    supplier=>
                                    <tr key = {supplier.supplierId}>
                                        <td>{supplier.supplierId}</td>
                                        <td>{supplier.sName}</td>
                                        <td>{supplier.sAddress}</td>
                                        <td>{supplier.sNumber}</td>
                                        <td>{supplier.drugType}</td>
                                        
                                        <td><button onClick = {()=> this.editSupplier(supplier.supplierId)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"10px"}} onClick = {()=> this.deleteSupplier(supplier.supplierId)} className="btn btn-danger">Delete</button>
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

export default ListSupplierComponent;