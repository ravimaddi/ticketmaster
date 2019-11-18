import React from 'react'
import './employeeform.css'
import {Container,Row,Col} from 'react-bootstrap'
class EmpForm extends React.Component{
    constructor() {
        super()
        this.state={
            name:'',
            email:'',
            mobile:'',
            department:''
        }
    }
    
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department 
        }
       
        this.props.handleSubmit(formData)

    }
    render(){
        return(
            <Container>
            <Row>
               <Col className="col-md-3"></Col>
               <Col className="col-md-5">
               <h3>Add Employee</h3>
                <form className="background" onSubmit={this.handleSubmit}>
                    <label> Name: 
                        <input className="input" type="text" onChange={this.handleChange} name="name"/>
                    </label><br/>
                    <label> Email: 
                        <input className="input" type="text" onChange={this.handleChange} name="email"/>
                    </label><br/>
                    <label> Mobile: 
                        <input className="input" type="text" onChange={this.handleChange} name="mobile"/>
                    </label><br/>
                    <label> Department: 
                        <select className="input" name="department" value={this.state.department} onChange={this.handleChange}>
                        
                            {this.props.dptList.map((dpt)=>{
                                return(
                                    <option key={dpt._id} value={dpt._id}>{dpt.name}</option>
                                )
                            })}
                        </select>
                    </label><br/>
                    <input className="submit" type="submit"/>
                </form>
                </Col>
                </Row>
            </Container>
        )
    }
}

export default EmpForm