import { Request,Response,NextFunction, response } from "express";
import { AppDataSource } from "../data-source";
import { Lesson } from "../entities/lesson";
import { isInteger } from "../utils";


export async function findLessonsForCourse(req:Request,res:Response,next:NextFunction){

    try{

        const courseId = req.params.courseId
        const query = req.query as any
        const pageNumber = query?.pageNumber ?? "0"
        const pageSize = query?.pageSize ?? "3"

        if(!isInteger(courseId)){
            throw `invalid course id ${courseId}`
        }
        if(!isInteger(pageNumber)){
            throw `invalid course id ${pageNumber}`
        }
        if(!isInteger(pageSize)){
            throw `invalid course id ${pageSize}`
        }

        const lessons = await AppDataSource.getRepository(Lesson).createQueryBuilder("lessons").where("lessons.courseId = :courseId",{courseId}).orderBy("lessons.seqNo").skip(pageNumber*pageSize).take(pageSize).getMany()
        console.log(lessons)

        res.status(200).json({lessons})

    }
    catch(error){
        return next(error)
    }
}