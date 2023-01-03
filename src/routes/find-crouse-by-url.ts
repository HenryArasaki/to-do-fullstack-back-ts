import { NextFunction,Request,Response } from "express";
import { logger } from "../logger";


export async function findCourseByUrl(req:Request, res:Response, next:NextFunction){

    try{
        const courseUrl = req.params.courseUrl

        if(!courseUrl){
            throw 'Could not extract the course url from the request'
        }

    }catch(error){
        logger.error("Error find course by url")
        return next(error)
    }

}