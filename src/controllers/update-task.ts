import { Request,Response,NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task";
import { isInteger } from "../utils";


export async function updateCourse(req:Request, res:Response,next:NextFunction){


    try{
        
        const taskId = req.params.taskId
        const changes = req.body

        if(!isInteger(taskId)){
            throw `invalid task id ${taskId}`
        }

        await AppDataSource.createQueryBuilder().update(Task).set(changes).where("id = :taskId",{taskId}).execute()

        res.status(200).json({
            message:`Task ${taskId} was updated successfully`
        })
    }
    catch(error){
        return next(error)
    }
}