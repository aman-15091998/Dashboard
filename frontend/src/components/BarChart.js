import { Chart as ChartJs } from "chart.js/auto"
import { Bar } from "react-chartjs-2"
export const BarChart=({data, month})=>{
    let keys=[];
    if(data)
        keys=Object.keys(data);
    const valArr=[];
    for(let index in data){
        valArr.push(data[index]);
    }
    const d={
        labels: keys,
        datasets:[
            {
                label:"Price range",
                data:valArr,
                backgroundColor:["blue", "green", "orange", "yellow", "brown"]
            }
        ]
    }
    return (
        <>
            <h4 className="text-center">Bar Chart - {month}</h4>
            <Bar data={d}/>
        </>
    )
}