import React from 'react'
import EmpForm from './EmpForm'
import axios from 'axios'
class EmpNew extends React.Component{
    constructor() {
        super()
        this.state={
            dptList:[]
        }
    }
    componentDidMount(){
        axios.get("http://dct-ticket-master.herokuapp.com/departments",{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const dptList=response.data
            this.setState({dptList})
        })
        .catch((err)=>{
            alert(err)
        })
    }
    handleSubmit=(formData)=>{
        axios.post('https://dct-ticket-master.herokuapp.com/employees',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                this.props.history.push('/employees')
            }

        })
        .catch((err)=>{
            alert(err)
        })
    }
    render(){
        return(
            <div>
                
                <EmpForm dptList={this.state.dptList} handleSubmit={this.handleSubmit}/>
                
            </div>
        
    )
        }
}
export default EmpNew