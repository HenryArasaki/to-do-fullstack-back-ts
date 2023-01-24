
import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";


export async function createCourse(req:Request, res:Response, next:NextFunction){


    try{

        const data = req.body

        if(!data){
            throw "No data avalible, cannot save course"
        }

        const course = await AppDataSource.manager.transaction("REPEATABLE READ",async(transactionalEntityManager)=>{

            const repository = transactionalEntityManager.getRepository(Course)

            const result = await repository.createQueryBuilder("courses").select("MAX(courses.seqNo)","max").getRawOne()

            const course = repository.create({...data,seqNo:(result?.max ?? 0)+1})

            await repository.save(course)

            return course
        })

        res.status(200).json({course})


    }
    catch(error){
        return next(error)
    }
}