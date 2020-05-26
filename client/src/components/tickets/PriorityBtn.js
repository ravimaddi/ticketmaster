import React from 'react'
import { Button } from 'react-bootstrap';
class PriorityBtn extends React.Component {
    handleClick = (e) => {
        if (e.target.name === 'low') {
            let ticketList = this.props.ticketList
            ticketList = ticketList.filter((t) => { return t.priority === "Low" })
            this.props.handlePrioritybtn(ticketList)
        }
        else if (e.target.name === 'high') {
            let ticketList = this.props.ticketList
            ticketList = ticketList.filter((t) => { return t.priority === "High" })
            this.props.handlePrioritybtn(ticketList)
        }
        else if (e.target.name === 'medium') {
            let ticketList = this.props.ticketList
            ticketList = ticketList.filter((t) => { return t.priority === "Medium" })
            this.props.handlePrioritybtn(ticketList)
        }
        else if (e.target.name === 'all') {
            let ticketList = this.props.ticketList
            this.props.handlePrioritybtn(ticketList)
        }
    }
    render() {
        return (
            <div>
                <Button style={{ margin: "1px" }} onClick={(e) => this.handleClick(e)} name="all">All</Button>
                <Button style={{ margin: "1px" }} onClick={(e) => this.handleClick(e)} name="high">High</Button>
                <Button style={{ margin: "1px" }} onClick={(e) => this.handleClick(e)} name="medium">Medium</Button>
                <Button style={{ margin: "1px" }} onClick={(e) => this.handleClick(e)} name="low">Low</Button>
            </div>
        )
    }
}

export default PriorityBtn