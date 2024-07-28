import { Router } from "express";
import { filterTransactions, getAllChartData, getBarChartData, getPieCahrtData, getTransactionStats, initializeDb } from "../controller/transaction.controller.js";

export const transactionRouter=Router();

transactionRouter.get("/initialize", initializeDb);
transactionRouter.get("/filter", filterTransactions);
transactionRouter.get("/stats", getTransactionStats);
transactionRouter.get("/bar-chart-data", getBarChartData);
transactionRouter.get("/pie-chart-data", getPieCahrtData);
transactionRouter.get("/all-chart-data", getAllChartData);
