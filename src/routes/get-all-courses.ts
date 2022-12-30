import {NextFunction, Request,Response} from 'express'
import { AppDataSource } from '../data-source'
import { logger } from '../logger'
import { Course } from '../models/course'

export async function getAllCourses(req:Request,res:Response, next:NextFunction){

    try{

        const courses = await AppDataSource.getRepository(Course).createQueryBuilder("courses").orderBy("courses.seqNo").getMany()

        res.status(200).json({courses})
    
    }catch(error){
        logger.error("Error getAllCourses")
        return next(error)
    }

}