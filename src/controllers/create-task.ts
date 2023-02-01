
import { NextFunction,Request,Response } from "express";
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task";


export async function createTask(req:Request, res:Response, next:NextFunction){


    try{

        const data = req.body
        const userId = req["user"].userId

        if(!data){
            throw "No data avalible, cannot save task"
        } 


        const repository = await AppDataSource.getRepository(Task)

        const task = new Task()

        task.title = data.title
        task.done = false
        task.user = userId

        await repository.save(task)

        res.status(200).json({task})
    }
    catch(error){
        return next(error)
    }
}