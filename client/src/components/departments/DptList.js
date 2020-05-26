import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './dpt.css'
class DptList extends React.Component {
    constructor() {
        super()
        this.state = {
            dptList: [],
            name: '',
            isEdit: false,
            editId: '',
            nameEdit: ''
        }
    }
    componentDidMount() {
        axios.get("http://dct-ticket-master.herokuapp.com/departments", {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const dptList = response.data
                this.setState({ dptList })
            })
            .catch((err) => {
                alert(err)
            })
    }
    handleName = (e) => {
        const name = e.target.value
        this.setState({ name })

    }
    handledel = (e, id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`, {
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then((response) => {
                        this.componentDidMount()
                    })
                    .catch((err) => {
                        alert(err)
                    })
            }
        })



    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.setState(() => {
            return {
                name: ''
            }
        })
        axios.post('https://dct-ticket-master.herokuapp.com/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                }
                else {
                    this.componentDidMount()
                }

            })
            .catch((err) => {
                alert(err)
            })
    }
    handleEdit = (e, id, name) => {

        this.setState({ isEdit: true, editId: id, nameEdit: name })

    }
    handleChange = (e, id) => {
        this.setState({ nameEdit: e.target.value })
    }
    handleUpdate = (e, id) => {
        const formData = {
            name: this.state.nameEdit
        }

        axios.put(`http://dct-ticket-master.herokuapp.com/departments/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                this.setState({ isEdit: false })
                this.componentDidMount()
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Department Name is updated!',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch((err) => {
                alert(err)
            })
    }
    handleCancel = (e, id) => {
        this.setState({ isEdit: false })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col className="col-md-2"></Col>
                    <Col className="col-md-8">

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input className="input" type="text" value={this.state.name} placeholder=" Add Department" onChange={this.handleName} />
                            </label>
                            <input className="button" type="submit" value="ADD" />
                        </form>
                        <br />
                        <h4>Departments List</h4>
                        <table className="pure-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dptList.map((dpt, i) => {
                                    return (
                                        <tr key={dpt._id}>
                                            <td>{i + 1}</td>
                                            <td>{this.state.isEdit && this.state.editId === dpt._id ? (<div><input type="text" onChange={(e) => this.handleChange(e, dpt._id)} value={this.state.nameEdit} />
                                                <button onClick={(e) => this.handleUpdate(e, dpt._id)}>Update</button>
                                                <button onClick={(e) => this.handleCancel(e, dpt._id)}>Cancel</button></div>)
                                                : dpt.name}</td>
                                            <td>
                                                <Button className="btn btn-info" style={{ marginRight: '10px' }} onClick={(e) => { this.handleEdit(e, dpt._id, dpt.name) }}>Edit</Button>
                                                <Button className="btn btn-warning" onClick={(e) => { this.handledel(e, dpt._id) }}>Remove</Button>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Col>
                    <Col className="col-md-2"></Col>
                </Row>
            </Container>
        )
    }
}
export default DptList