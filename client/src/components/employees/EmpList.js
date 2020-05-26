import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Container, Button } from 'react-bootstrap'
class EmpList extends React.Component {
    constructor() {
        super()
        this.state = {
            empList: []
        }
    }
    componentDidMount() {
        axios.get('http://dct-ticket-master.herokuapp.com/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((repsonse) => {
                const empList = repsonse.data
                console.log(empList)
                this.setState({ empList })
            })
            .catch((err) => {
                alert(err)
            })

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
                axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
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
    render() {

        return (

            <Container>

                <Link to="/employees/new">Add Employee</Link>

                <br />
                <br />
                <h3>Employees List</h3>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.empList.map((emp, i) => {
                            return (
                                <tr key={emp._id}>
                                    <td>{i + 1}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.mobile}</td>
                                    <td>{emp.department && emp.department.name}</td>
                                    <td><Button className="btn btn-danger" onClick={(e) => { this.handledel(e, emp._id) }}>Remove</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Container>


        )
    }

}

export default EmpList
