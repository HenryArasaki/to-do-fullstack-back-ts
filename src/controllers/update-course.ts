import { Request,Response,NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";
import { isInteger } from "../utils";


export async function updateCourse(req:Request, res:Response,next:NextFunction){


    try{
        
        const courseId = req.params.courseId
        const changes = req.body

        if(!isInteger(courseId)){
            throw `invalid course id ${courseId}`
        }

        await AppDataSource.createQueryBuilder().update(Course).set(changes).where("id = :courseId",{courseId}).execute()

        res.status(200).json({
            message:`Course ${courseId} was updated successfully`
        })
    }
    catch(error){
        return next(error)
    }
}