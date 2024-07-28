export const error404Handler=(req, res)=>{
    res.status(404).send({success:false, message:"Resource not found!"});
}