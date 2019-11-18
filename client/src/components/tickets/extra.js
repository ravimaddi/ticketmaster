import React from 'react'
import axios from 'axios'
import Ticetform from './TicketForm'
import './ticket.css'
import PriorityChart from './PriorityChart'
import DeptChart from './DeptChart'
import ProgressBar from './ProgressBar'
import TicketSearch from './TicketSearch'
import PriorityBtn from './PriorityBtn'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron'
class TicketList extends React.Component{
    constructor(){
        super()
        this.state={
            ticketList:[],
            dptList:[],
            custList:[],
            deptNames:[],
        
    }
    this.data={
        ticketList:[]
    }
    
}

componentDidMount(){
   const p1= axios.get('https://dct-ticket-master.herokuapp.com/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
  const p2=  axios.get("http://dct-ticket-master.herokuapp.com/departments",{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
  const p3= axios.get("http://dct-ticket-master.herokuapp.com/customers",{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    Promise.all([p1,p2,p3]).then((values)=>{
        this.data.ticketList=values[0].data
        this.setState({
            ticketList:values[0].data,
            dptList:values[1].data,
            custList:values[2].data
        
        })
    })
}
handleStatus=(e,id)=>{
    if(e.target.checked){
   const ticket= this.state.ticketList.find((t)=>{return t._id===id})
   ticket.isResolved=true
   axios.put(`https://dct-ticket-master.herokuapp.com/tickets/${ticket._id}`,ticket,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
    })
    .then(()=>{
        axios.get('https://dct-ticket-master.herokuapp.com/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    }).then((response)=>{
        const ticketList=response.data
        this.setState({ticketList:ticketList})
    })
    .catch((err)=>{
        alert(err)
    })
    })
    .catch((err)=>{
        alert(err)
    })
}
else{
    const ticket= this.state.ticketList.find((t)=>{return t._id===id})
   ticket.isResolved=false
   axios.put(`https://dct-ticket-master.herokuapp.com/tickets/${ticket._id}`,ticket,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
    })
    .then(()=>{
        axios.get('https://dct-ticket-master.herokuapp.com/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    }).then((response)=>{
        const ticketList=response.data
        this.setState({ticketList:ticketList})
    })
    .catch((err)=>{
        alert(err)
    })
    })
    .catch((err)=>{
        alert(err)
    })
}
}
getTicketList=()=>{
    axios.get('https://dct-ticket-master.herokuapp.com/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
            }).then((response)=>{
                const ticketList=response.data
                this.data.ticketList=ticketList
            })
            .catch((err)=>{
                alert(err)
            })
}
handleDptName=(did)=>{
  const d= this.state.dptList.find((dpt)=>{return dpt._id===did})  
  if(d){
      this.state.deptNames.push(d.name)
    return d.name 
  }
  else{
      return ''
  }
    
}
handleCustomerName=(cid)=>{
    const c=this.state.custList.find((cus)=>{return cus._id===cid})
    if(c){
        return c.name 
      }
      else{
          return ''
      }
}
handleSubmit=(formData)=>{
    axios.post('https://dct-ticket-master.herokuapp.com/tickets',formData,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }
        else{
             axios.get('https://dct-ticket-master.herokuapp.com/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    }).then((response)=>{
        const ticketList=response.data
        this.setState({ticketList:ticketList})
    }).catch((err)=>{
        alert(err)
    })
        }

    })
    .catch((err)=>{
        alert(err)
    })
}
handleCodeChange=(code)=>{
    if(code!=='select'){
   this.getTicketList()
    this.setState((prevState)=>{
        return{
            ticketList:this.data.ticketList.filter((t)=>{return t.code===code})
        }
    })
}
else{
    this.setState({ticketList:this.data.ticketList})
}
}
handlePrioritybtn=(ticketList)=>{
    this.setState({ticketList:ticketList})
}
handleFormSubmit=(formData)=>{
    axios.post('https://dct-ticket-master.herokuapp.com/customers',formData,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }
        else{
            axios.get("http://dct-ticket-master.herokuapp.com/customers",{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            }).then((response)=>{
                const custList=response.data
                this.setState({custList:custList})
                alert('Customer Added Successfully!!')
            })
        }

    })
    .catch((err)=>{
        alert(err)
    })
}
deleteTicket=(e,id)=>{
   const confirm = window.confirm('Are you sure?')
   if(confirm){
       this.setState((prevState)=>{
           return{
               ticketList:prevState.ticketList.filter((t)=>{return t._id!==id})
           }
       })
//     axios.delete(`https://dct-ticket-master.herokuapp.com/tickets/${id}`,{
//                 headers:{
//                     'x-auth':localStorage.getItem('authToken')
//                 }
//             }).then(()=>{
                
//             })
//             .catch((err)=>{
//                 alert(err)
//             })
  }
}
render(){
    const st={
        width:'300px',
        border:'1px solid',
        padding:'10px',
        margin:'10px'
    }
    const title={
        textAlign:'center'
    }
    return(
        <div >
            <div style={title}>
                <Jumbotron>
            <h1 >Ticket Master</h1>
            
            <h2>Listing Tickets - {this.state.ticketList.length} </h2>
           
            </Jumbotron>
            <TicketSearch  handleCodeChange={this.handleCodeChange} ticketList={this.data.ticketList}/>
            <br/>
            <PriorityBtn handlePrioritybtn={this.handlePrioritybtn}/>
            <br/>
            </div>
            <Container>
                <Row>
                    <Col>
            <table className="pure-table" >
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Priority</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ticketList.map((t)=>{
                            return (
                                <tr key={t._id}>
                                <td>{t.code}</td>
                                <td>{this.handleCustomerName(t.customer)}</td>
                                <td>{this.handleDptName(t.department)}</td>
                                <td>{t.priority}</td>
                                <td>{t.message}</td>
                                <td><input type="checkbox" checked={t.isResolved} onChange={(e)=>this.handleStatus(e,t._id)}/></td>
                                <td><button onClick={(e)=>this.deleteTicket(e,t._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            </Col>
            <Col>
            <div style={st} >
            <Ticetform handleFormSubmit={this.handleFormSubmit}custList={this.state.custList} dptList={this.state.dptList} handleSubmit={this.handleSubmit} />
            </div>
            <br/>
            </Col>
            </Row>
            </Container>
            <Container>
            <Row>
            <Col>
            <ProgressBar ticketList={this.state.ticketList}/>
            </Col>
            </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                    
            <PriorityChart ticketList={this.state.ticketList}/>
            </Col>
            <Col>
           {this.state.ticketList.length>0 && <DeptChart ticketList={this.state.ticketList} dptList={this.state.dptList} />}
           </Col>
           </Row>
           </Container>
            
        </div>
        
        
    )
}

}
export default TicketList