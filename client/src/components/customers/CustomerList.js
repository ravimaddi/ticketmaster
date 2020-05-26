import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Container, Row, Col, Button } from 'react-bootstrap'

import './customer.css'
class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            customerList: [],
            isdelete: false,
            allChecked: false
        }
    }
    componentDidMount() {
        axios.get('https://dct-ticket-master.herokuapp.com/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                let customerList = response.data
                customerList = customerList.map((cust) => {
                    return (
                        Object.assign(cust, { isChecked: false })
                    )

                })
                this.setState({ customerList })
            })
            .catch((err) => {
                alert(err)
            })
    }

    handleAllClick = (e) => {
        if (e.target.checked) {
            this.setState({ allChecked: true })
        }
        else {
            this.setState({ allChecked: false })
        }
        let customerList = this.state.customerList
        customerList.forEach((cust) => {
            cust.isChecked = e.target.checked
        })
        this.setState({ customerList: customerList })
        if (e.target.checked) {
            this.setState({ isdelete: true })
        }
        else {
            this.setState({ isdelete: false })
        }

    }
    handleClick = (e, id) => {
        let customerList = this.state.customerList
        customerList.forEach((cust) => {
            if (cust._id === id) {
                cust.isChecked = e.target.checked
            }
        })
        let arr = customerList.find((cust) => { return cust.isChecked })
        let array = this.state.customerList.filter((cust) => { return cust.isChecked })
        if (array.length === this.state.customerList.length) {
            this.setState({ allChecked: true })
        }
        else {
            this.setState({ allChecked: false })
        }
        let isdelete = ''
        if (arr) {
            isdelete = true
        }
        else {
            isdelete = false
        }
        this.setState({ customerList: customerList, isdelete: isdelete })
    }
    handledel = (e) => {
        let arr = this.state.customerList.filter((cust) => { return cust.isChecked })
        let newarr = this.state.customerList.filter((cust) => { return !cust.isChecked })
        Swal.fire({
            title: `Are you sure to delete ${arr.map((cust) => { return cust.name })}`,
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            width: '1000px'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                this.setState({ customerList: newarr })
                arr.forEach((arr) => {
                    axios.delete(`https://dct-ticket-master.herokuapp.com/customers/${arr._id}`, {
                        headers: {
                            'x-auth': localStorage.getItem('authToken')
                        }
                    }).then(() => {
                        this.componentDidMount()
                    })
                        .catch((err) => {
                            alert(err)
                        })
                })
            }
        })

    }
    render() {
        return (
            <div >

                <Container >
                    <Row>
                        <Col>
                            <Link className="button" to="/customers/new">Add Customer</Link>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-10">
                            <h2>Customers List</h2>
                            <table className="pure-table table" >
                                <thead  >
                                    <tr >
                                        <th >ID</th>
                                        <th >Name</th>
                                        <th>Email</th>
                                        <th >Mobile</th>
                                        <th >Actions</th>
                                        <th> Delete <input type="checkbox" checked={this.state.allChecked} onChange={(e) => this.handleAllClick(e)} /></th>
                                    </tr>

                                </thead>
                                <tbody>

                                    {this.state.customerList.map((user, i) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{i + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.mobile}</td>
                                                <td><Link to={`/customers/${user._id}`}>Show</Link></td>
                                                <td><input type="checkbox" checked={user.isChecked} onChange={(e) => this.handleClick(e, user._id)} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-9"></Col>
                        <Col className="col-md-3">{(this.state.isdelete) ? <Button type="button" className="btn btn-danger" onClick={(e) => this.handledel(e)}>Delete</Button> : null
                        }
                        </Col>
                    </Row>
                </Container>




            </div>
        )
    }
}

export default CustomerList