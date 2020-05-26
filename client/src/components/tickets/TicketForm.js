import React from 'react'
import Select from 'react-select'
import ModalForm from './ModalForm'
import './tickets.css'
class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: '',
            department: '',
            priority: '',
            message: '',
            code: '',
            employee: '',
            empList: []
        }

    }
    handleName = (v) => {
        this.setState({ customer: v.value })
    }
    handleEmployeeName = (v) => {
        this.setState({ employee: v.value })
    }
    handleChange = (e) => {
        if (e.target.name === "department") {
            let empList = this.props.empList
            empList = empList.filter((emp) => {
                return emp.department._id === e.target.value
            })
            this.setState({ department: e.target.value, empList })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formdata = {
            customer: this.state.customer,
            department: this.state.department,
            priority: this.state.priority,
            message: this.state.message,
            employees: [{ _id: this.state.employee }],
            code: `DCT-${Math.random().toString().substr(2, 5)}`
        }
        this.setState({
            customer: '',
            department: '',
            employees: '',
            priority: '',
            message: '',
            code: ''
        })
        this.props.handleSubmit(formdata)
    }
    handleReset = () => {
        this.setState({
            customer: '',
            department: '',
            employees: '',
            priority: '',
            message: '',
            code: ''
        })
    }

    render() {
        const options = this.props.custList.map((cus) => { return ({ value: cus._id, label: cus.name }) })
        const employees = this.state.empList.map((emp) => { return ({ value: emp._id, label: emp.name }) })

        return (
            <div >
                <h3>Add Ticket</h3>
                <form className="formbackground" onSubmit={this.handleSubmit} >
                    <br />
                    <label > Customer Name:
                        <Select options={options} onChange={(values) => { this.handleName(values) }} name="customer" />
                    </label>
                    <br />
                    <ModalForm handleFormSubmit={this.props.handleFormSubmit} />
                    <label >Department:
                        <select value={this.state.dept} onChange={(e) => { this.handleChange(e) }} name="department">
                            {this.props.dptList.map((dpt) => {
                                return (
                                    <option key={dpt._id} value={dpt._id}>{dpt.name}</option>
                                )
                            })}
                        </select>

                    </label>
                    <label > Employee Name:
                        <Select options={employees} onChange={(values) => { this.handleEmployeeName(values) }} name="employee" />
                    </label>
                    <br />
                    <label > Priority:
                        <input type="radio" name="priority" value="High" onChange={(e) => { this.handleChange(e) }} />High
                        <input type="radio" name="priority" value="Medium" onChange={(e) => { this.handleChange(e) }} />Medium
                        <input type="radio" name="priority" value="Low" onChange={(e) => { this.handleChange(e) }} />Low
                    </label><br />
                    <label > Message:
                            <textarea rows="4" cols="30" name="message" onChange={(e) => { this.handleChange(e) }}></textarea>
                    </label><br />
                    <input type="submit" />
                    <input type="reset" onClick={this.handleReset} />
                </form>

            </div>
        )
    }
}
export default TicketForm