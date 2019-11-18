import React from 'react'
import Progress from 'react-progressbar';

 function ProgressBar(props){
    const arr= props.ticketList.filter((t)=>{return t.isResolved})
   let per=(arr.length/props.ticketList.length)*100
    return(
        <div>
            <h1>Percentage of Tickets Resolved:-  {Math.round(per)}%</h1>
            
            <Progress completed={per} />
        </div>
    )
}
export default ProgressBar