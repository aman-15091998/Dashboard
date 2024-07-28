import styles from "./component.module.css";
export const Stats=({totalAmt, totalSold, totalNotSold, month})=>{
    return (
        <div className={styles.statsDiv}>
            <h4 className="text-center">Statistics - {month}</h4>
            <p >Total Sale: ₹{totalAmt?.toFixed(2)}</p>
            <p >Total Sold Items: {totalSold}</p>
            <p >Total Not Sold Items: {totalNotSold}</p>
        </div>
    )
}