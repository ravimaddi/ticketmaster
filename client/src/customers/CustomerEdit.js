import React from 'react'
import axios from 'axios'
import CustomerForm from './CustomerForm'
import {Container,Row,Col} from 'react-bootstrap'

class CustomerEdit extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
    }
    componentDidMount(){
        const id =this.props.match.params.id
        axios.get(`https://dct-ticket-master.herokuapp.com/customers/${id}`,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
            }).then((response)=>{
                const customer=response.data
                this.setState({customer})
            })
            .catch((err)=>{
                alert(err)
            })
    }
    handleSubmit=(formData)=>{
        const id = this.props.match.params.id
        axios.put(`https://dct-ticket-master.herokuapp.com/customers/${id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                this.props.history.push(`/customers/${response.data._id}`)
            }

        })
        .catch((err)=>{
            alert(err)
        })
    }
    render(){
        
        return(
            <Container>
            <Row>
              <Col className="col-sm-4"></Col>
                  <Col className="col-sm-4">
                  <h3>Edit Customer</h3>
               {Object.keys(this.state.customer).length>0 && <CustomerForm customer={this.state.customer} handleSubmit={this.handleSubmit}/>} 
            </Col>
            </Row>
            </Container>
        )
    }
}
export default CustomerEdit