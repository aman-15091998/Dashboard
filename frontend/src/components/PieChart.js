import { Chart as ChartJs } from "chart.js/auto"
import { Pie } from "react-chartjs-2"
export const PieChart=({data, month})=>{
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
                label:"Category",
                data:valArr,
                backgroundColor:["blue", "green", "orange", "yellow", "brown"]
            }
        ]
    }
    return (
        <Pie data={d}/>
    )
}