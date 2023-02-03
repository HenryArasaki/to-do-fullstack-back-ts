import {NextFunction, Request,Response} from 'express'
import { AppDataSource } from '../data-source'
import { Task } from '../entities/task'

export async function getAllTasks(req:Request,res:Response, next:NextFunction){

    const id = req["user"].userId
    console.log(id)
    try{




        const tasks = await AppDataSource.getRepository(Task).createQueryBuilder("tasks").where("tasks.userId = :id",{id:id}).orderBy("tasks.createdAt").getMany()

        res.status(200).json({tasks})
    
    }catch(error){
        return next(error)
    }

}