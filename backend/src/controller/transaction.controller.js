import { getMonthNum } from "../../utils/getMonthNum.js";
import { addDocs, getDocCount, getFilteredTransactions, getTransactionsByMonth, getTransactionsGroupByCategories } from "../model/transaction.repository.js";

export const initializeDb=async (req, res, next)=>{
    try{
        const count=await getDocCount();

        if(count==0){
            await addDocs();
        }
        res.send({success:true, message:"DB initialized!"});
    }
    catch(err){
        next(err);
    }
}
export const filterTransactions=async (req, res, next)=>{
    try{
        let {search, page, month}=req.query;
        if(!page)
            page=1;
        if(!search)
            search="";
        if(!month)
            month="march";
        const monthNum=getMonthNum(month.toLowerCase());
        const filteredDocs=await getFilteredTransactions(search, page, monthNum, 10);
        res.send({success:true, data:filteredDocs});
    }catch(err){
        next(err);
    }
}
export const getTransactionStats=async (req, res, next)=>{
    try{
        let {month}=req.query;
        if(!month)
            month="march"
        const monthNum=getMonthNum(month.toLowerCase());
        const transactions=await getTransactionsByMonth(monthNum);
        let soldArr=transactions.filter(t=>t.sold==true);
        let soldAmt=soldArr.reduce((sum, t)=>sum+t.price,0);
        let notSoldArr=transactions.filter(t=>t.sold==false);
        res.send({totalSoldAmount:soldAmt, soldItems:soldArr.length, notSoldItems:notSoldArr.length});
    }catch(err){
        next(err);
    }
}
export const getBarChartData=async(req, res, next)=>{
    try{
        let {month}=req.query;
        if(!month)
            month="march"
        const monthNum=getMonthNum(month.toLowerCase());
        const transactions=await getTransactionsByMonth(monthNum);
        res.send({
            "0-100": transactions.filter(t => t.price >= 0 && t.price <= 100).length,
            "101-200": transactions.filter(t => t.price > 100 && t.price <= 200).length,
            "201-300": transactions.filter(t => t.price > 200 && t.price <= 300).length,
            "301-400": transactions.filter(t => t.price > 300 && t.price <= 400).length,
            "401-500": transactions.filter(t => t.price > 400 && t.price <= 500).length,
            "501-600": transactions.filter(t => t.price > 500 && t.price <= 600).length,
            "601-700": transactions.filter(t => t.price > 600 && t.price <= 700).length,
            "701-800": transactions.filter(t => t.price > 700 && t.price <= 800).length,
            "801-900": transactions.filter(t => t.price > 800 && t.price <= 900).length,
            "901-above": transactions.filter(t => t.price > 900).length
        });
    }catch(err){
        console.log(err);
        next(err);
    }
}
export const getPieCahrtData=async (req, res, next)=>{
    try{
        let {month}=req.query;
        if(!month)
            month="march";
        const monthNum=getMonthNum(month.toLowerCase());
        const data=await getTransactionsGroupByCategories(monthNum);
        let dataObj={};
        data.forEach((obj)=>{
            dataObj={...dataObj, [obj.category]:obj.count}
        });
        res.send(dataObj);
    }catch(err){
        console.log(err);
        next(err);
    }
}
export const getAllChartData=async (req, res, next)=>{
    try{
        let {month}=req.query;
        if(!month)
            month="march";
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const statsRes=await fetch(`${baseUrl}/api/transactions/stats/?month=${month}`);
        const statsData=await statsRes.json();
        const barDataRes=await fetch(`${baseUrl}/api/transactions/bar-chart-data/?month=${month}`);
        const barData=await barDataRes.json();
        const pieDataRes=await fetch(`${baseUrl}/api/transactions/pie-chart-data/?month=${month}`);
        const pieData=await pieDataRes.json();
        res.send({pieData, barData, statsData});
    }catch(err){
        console.log(err);
        next(err);
    }
}