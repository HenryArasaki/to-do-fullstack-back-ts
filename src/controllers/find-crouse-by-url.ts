import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";
import { Lesson } from "../entities/lesson";


export async function findCourseByUrl(req:Request, res:Response, next:NextFunction){

    try{
        const courseUrl = req.params.courseUrl

        if(!courseUrl){
            throw 'Could not extract the course url from the request'
        }

        const course = await AppDataSource.getRepository(Course).findOneBy({url:courseUrl})

        if (!course){
            const message = `Could not find a course with url ${courseUrl}`
            console.log(message)
            res.status(404).json({message})
            return
        }

        const totalLessons = await AppDataSource.getRepository(Lesson).createQueryBuilder("lessons").where("lessons.courseId = :courseId",{courseId:course.id}).getCount()


        res.status(200).json({
            course,
            totalLessons,
        })

    }catch(error){
        return next(error)
    }

}