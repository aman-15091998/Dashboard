import { createContext, useContext, useState } from "react";

const Context=createContext();

export const MainContext=({children})=>{
    const [transactions, setTransactions]=useState(null);
    const [data, setData]=useState(null);
    return (
        <Context.Provider value={{data, setData, transactions, setTransactions}}>
            {children}
        </Context.Provider>
    )
}

export const useValue=()=>{
    return useContext(Context);
}