import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task";
import { isInteger } from "../utils";


export async function deleteTask(req:Request, res:Response, next:NextFunction){

    try{
        const taskId = req.params.taskId

        if(!isInteger(taskId)){
            throw `invalid task id ${taskId}`
        }

        AppDataSource.manager.transaction(async(transactionalEntityManager)=>{
            transactionalEntityManager.createQueryBuilder().delete().from(Task).where("taskId = :taskId",{taskId}).execute()
        })

        res.status(200).json({
            message:`Course deleted successfully ${taskId}`
        })

    }
    catch(error){
        return next(error)
    }

}