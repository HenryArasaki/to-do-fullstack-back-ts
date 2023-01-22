import { NextFunction, Request,response,Response } from "express";



export function defaultErrorHandler(err,req:Request,res:Response,next:NextFunction){


    if (res.headersSent){
        return next(err)
    }

    response.status(500).json({
        status:"error",
        message:"Default error handling triggered"
    })
}