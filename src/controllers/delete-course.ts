import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";
import { Lesson } from "../entities/lesson";
import { isInteger } from "../utils";


export async function deleteCourseAndLessons(req:Request, res:Response, next:NextFunction){

    try{
        const courseId = req.params.courseId

        if(!isInteger(courseId)){
            throw `invalid course id ${courseId}`
        }

        AppDataSource.manager.transaction(async(transactionalEntityManager)=>{
            transactionalEntityManager.createQueryBuilder().delete().from(Lesson).where("courseId = :courseId",{courseId}).execute()

            await transactionalEntityManager.createQueryBuilder().delete().from(Course).where("id = :courseId",{courseId}).execute()
        })

        res.status(200).json({
            message:`Course deleted successfully ${courseId}`
        })

    }
    catch(error){
        return next(error)
    }

}