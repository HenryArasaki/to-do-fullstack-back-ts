import { NextFunction, Request,response,Response } from "express";
import { logger } from "../logger";


export function defaultErrorHandler(err,req:Request,res:Response,next:NextFunction){

    logger.error("default error handler; reason: ", err)

    if (res.headersSent){
        return next(err)
    }

    response.status(500).json({
        status:"error",
        message:"Default error handling triggered"
    })
}