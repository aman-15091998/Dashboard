import { CustomError } from "./CustomError.js"

export const errorHandler=(err, req, res, next)=>{
    let statusCode=err.statusCode || 500;
    let message="Something went wrong!";
    if(err instanceof CustomError){
        message=err.message;
    }
    res.status(statusCode).send({success:false, message:message});
}