import React from 'react'
import Select from 'react-select'

class TicketSearch extends React.Component {
    handleName = (v) => {
        this.props.handleCodeChange(v.value)
    }
    render() {
        const options = this.props.ticketList.map((t) => { return ({ value: t.code, label: t.code }) })
        options.unshift({ value: 'select', label: 'Select' })
        return (
            <div>
                <Select options={options} onChange={(values) => { this.handleName(values) }} name="code" />
            </div>

        )
    }
}
export default TicketSearch