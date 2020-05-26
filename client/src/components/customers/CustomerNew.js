import React from 'react'
import CustomerForm from './CustomerForm'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
class CustomerNew extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    handleSubmit = (formData) => {
        axios.post('https://dct-ticket-master.herokuapp.com/customers', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                }
                else {
                    this.props.history.push('/customers')
                }

            })
            .catch((err) => {
                alert(err)
            })
    }
    render() {
        return (

            <Container>
                <Row>
                    <Col className="col-md-4"></Col>
                    <Col className="col-md-4">
                        <h3>Add Customer</h3>
                        <CustomerForm handleSubmit={this.handleSubmit} />
                    </Col>
                </Row>
            </Container>

        )
    }

}
export default CustomerNew