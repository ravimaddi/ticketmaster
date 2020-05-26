import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './customerForm.css'
class CustomerShow extends React.Component {
    state = {
        customer: {}
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`https://dct-ticket-master.herokuapp.com/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const customer = response.data
                this.setState({ customer })

            })
            .catch((err) => {
                alert(err)
            })
    }
    render() {
        return (
            <Container >
                <Row>
                    <Col className="col-md-2"></Col>
                    <Col className="col-md-4 customerform">
                        <h3>Customer Details</h3>
                        <Row> <p><strong className="strong">Name:</strong>{this.state.customer.name}</p></Row>
                        <Row><p><strong className="strong">Email:</strong>{this.state.customer.email}</p></Row>
                        <Row><p><strong className="strong">Mobile:</strong>{this.state.customer.mobile}</p></Row>
                        <Row style={{ padding: "30px" }}>
                            <Col className="col-md-4">
                                <Link className="back" to="/customers">Back</Link>
                            </Col>
                            <Col className="col-md-4">
                                <Link className="edit" to={`/customers/edit/${this.state.customer._id}`}> Edit</Link>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default CustomerShow