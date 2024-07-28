import { getTransactionStats } from "../controller/transaction.controller.js";
import { transactionModel } from "./transaction.schema.js";
export const getDocCount=async()=>{
    const docCount=await transactionModel.countDocuments();
    return docCount;
}
export const addDocs=async ()=>{
    const res=await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const docArr= await res.json();
    await transactionModel.insertMany(docArr);
}
export const getFilteredTransactions=async (search, page, monthNum, pageSize)=>{
    const skipCount=(page-1)*pageSize;
    const filteredTransactions=await transactionModel.aggregate([
        {$addFields:{
            month:{$month:"$dateOfSale"}
        }},
        {$match:{
            month:monthNum,
            $or: [
                { title: { $regex: search, $options: 'i' } }, 
                { description: { $regex: search, $options: 'i' } },
                { price: { $eq: parseFloat(search) } } 
            ]
        }},
        {
            $skip: skipCount
        },
        {
            $limit: pageSize 
        },
        {
            $project: {
                _id: 0,
                month:0,
                dateOfSale:0,
                __v:0
            }
        }
    ]);
    return filteredTransactions;
}

export const getTransactionsByMonth=async (monthNum)=>{
    const transactions=await transactionModel.aggregate([
        {
            $addFields:{ month:{$month:"$dateOfSale"}}
        },
        {
            $match:{ month:monthNum}
        }
    ]);
    return transactions;
}
export const getTransactionsGroupByCategories=async (monthNum)=>{
    const data = await transactionModel.aggregate([
        {
            $addFields: { month: { $month: "$dateOfSale" } }
        },
        {
            $match:{ month:monthNum}
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                category: "$_id",
                count: 1, 
                _id: 0
            }
        }
    ]);
    return data;
}