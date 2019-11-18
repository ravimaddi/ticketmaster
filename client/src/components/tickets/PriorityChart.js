import React from 'react'
import { Chart } from "react-google-charts";

class PriorityChart extends React.Component{
    constructor(){
        super()
        this.state={
          high:'',
          low:'',
          medium:'' 
        }
    }
    
    render(){
        const pieOptions = {
            title: "Ticket Priority %",
            pieHole: 0.6,
            slices: [
              {
                color: "#2BB673"
              },
              {
                color: "#d91e48"
              },
              {
                color: "#007fad"
              },
              {
                color: "#e9a227"
              }
            ],
            legend: {
              position: "bottom",
              alignment: "left",
              textStyle: {
                color: "233238",
                fontSize: 14
              }
            },
            tooltip: {
              showColorCode: true
            },
            chartArea: {
              left: 0,
              top: 0,
              width: "100%",
              height: "80%"
            },
            fontName: "Roboto"
          };
          const high= this.props.ticketList.filter((ti)=>{ return ti.priority==='High'})
          const medium= this.props.ticketList.filter((ti)=>{ return ti.priority==='Medium'})
          const low= this.props.ticketList.filter((ti)=>{ return ti.priority==='Low'})
        return(
            <div>
                <h1>Ticket Priority %</h1>
                <Chart
          chartType="PieChart"
          data={[["High","Medium"], ["High", high.length], ["Medium", medium.length],["Low",low.length]]}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
            </div>
        )
    }

}
export default PriorityChart