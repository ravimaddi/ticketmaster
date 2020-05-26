import React from 'react'
import { Chart } from 'react-google-charts'

class DeptChart extends React.Component {
    constructor() {
        super()
        this.data = {
            deptName: []
        }
    }

    handleDptName = (did) => {
        const d = this.props.dptList.find((dpt) => { return dpt._id === did })
        if (d) {
            return d.name
        }
        else {
            return ''
        }

    }

    render() {

        const deptId = []
        this.props.ticketList.forEach((t) => { deptId.push(t.department) })
        deptId.forEach((id) => { this.data.deptName.push(this.handleDptName(id)) })
        let obj = {}
        this.data.deptName.forEach((dept) => {
            if (obj.hasOwnProperty(dept)) {
                obj[dept]++
            }
            else {
                obj[dept] = 1
            }
        })
        let data = []
        let v = Object.values(obj)
        data = Object.keys(obj).map((k, i) => {
            return [k, v[i], "#" + ((1 << 24) * Math.random() | 0).toString(16)]
        })
        data.unshift(["Department", "Number", { role: "style" }])
        this.data.deptName = []

        return (
            <div>
                <h1>Tickets By Department</h1>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={data}
                />
            </div>
        )
    }
}
export default DeptChart