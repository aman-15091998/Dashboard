import logo from './logo.svg';
import './App.css';
import { Table } from './components/Table';
import { useEffect, useState } from 'react';
import { useValue } from './context/mainContext';
import { Stats } from './components/Stats';
import { PieChart } from './components/PieChart';
import { BarChart } from './components/BarChart';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function App() {
  const [month, setMonth]=useState("March");
  const [page, setPage]=useState(1);
  const [search, setSearch]=useState("");
  const {transactions, setTransactions, data, setData}=useValue();
  useEffect(()=>{
    async function getTransactions(){
      const res=await fetch(`http://localhost:5001/api/transactions/filter/?month=${month}&search=${search}&page=${page}`);
      const obj=await res.json();
      // console.log(obj);
      setTransactions(obj.data);
    }
    getTransactions().catch((err)=>{
      console.log(err);
    });
  }, [month, search, page]);
  useEffect(()=>{
    async function getData(){
      const res=await fetch(`http://localhost:5001/api/transactions/all-chart-data/?month=${month}`);
      const d=await res.json();
      // console.log(d);
      setData(d);
    }
    getData().catch((err)=>{
      console.log(err);
    });
  }, [month]);

  const goToPrevPage=()=>{
    if(page>1){
      setPage(page-1);
    }
  }
  const goToNextPage=()=>{
    if(transactions.length>0){
      setPage(page+1);
    }
    console.log(transactions);
  }

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      <div className="inputDiv">
        <input className='searchInput' onChange={(e)=>{setSearch(e.target.value)}} value={search} type='text' placeholder='type to search'></input>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle dropdownBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Selected: {month}
          </button>
          <ul className="dropdown-menu">
            {monthNames.map(m=>(<li key={m} onClick={()=>{setMonth(m)}}>{m}</li>))}
          </ul>
        </div>
      </div>
      <div className='componentsDiv'>
        <div className='leftDiv'>
          <Table data={transactions}/>
        </div>
        <div className='rightDiv'>
          <Stats totalAmt={data?.statsData.totalSoldAmount} totalNotSold={data?.statsData.notSoldItems} totalSold={data?.statsData.soldItems} month={month}/>
        </div>
        
      </div>
      <div className='pageBtnDiv'>
            <span onClick={goToPrevPage}>Prev</span>
            <p>{page}</p>
            <span onClick={goToNextPage}>Next</span>
      </div>
      <div className='chartDiv'>
        <div className='pieDiv'>
            <PieChart data={data?.pieData}/>
        </div>
        <div className='barDiv'>
          <BarChart data={data?.barData}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
