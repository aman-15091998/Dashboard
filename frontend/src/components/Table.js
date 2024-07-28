import styles from "./component.module.css";
export const Table=({data})=>{
    if(!data || data.length==0)
      return <h2>No transactions to show!</h2>
    let keys=[];
    if(data && data.length>0)
        keys=Object.keys(data[0]);
    return (
    <table className={`table table-striped ${styles.tableElement}`}>
      <thead>
        <tr>
         {keys.map((k, index)=>(<th key={index}>{k}</th>))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((row, index) => {
          let valArr=[];
          for(let k in row){
            if(k=="sold" && row[k]==true)
                valArr.push("true");
            else if(k=="sold" && row[k]==false)
                valArr.push("false");
            else if(k=="image")
                valArr.push(<img src={row[k]} width="60px" height="60px"></img>);
            else
                valArr.push(row[k]);
          }
          return (<tr key={index}>
            {valArr.map((val, index)=>(<td key={index}>{val}</td>))}
          </tr>)
        })}
      </tbody>
    </table>
    )
}