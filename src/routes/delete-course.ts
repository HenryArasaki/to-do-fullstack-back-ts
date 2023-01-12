import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { Lesson } from "../models/lesson";
import { isInteger } from "../utils";


export async function deleteCourseAndLessons(req:Request, res:Response, next:NextFunction){

    try{
        const courseId = req.params.courseId

        if(!isInteger(courseId)){
            throw `invalid course id ${courseId}`
        }

        AppDataSource.manager.transaction(async(transactionEntityManager)=>{
            transactionEntityManager.createQueryBuilder().delete().from(Lesson).where("courseId = :courseId",{courseId}).execute()
        })


    }
    catch(error){
        logger.error("Error calliing deleteCourseAndLessons")
        return next(error)
    }

}