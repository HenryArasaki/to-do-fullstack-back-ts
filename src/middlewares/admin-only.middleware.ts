import {Request, Response, NextFunction} from 'express'



export function checkIfAdmin(req:Request,res:Response,next:NextFunction){


    const user = req["user"]

    if(!user?.isAdmin){
        res.sendStatus(403)
        return
    }

    next()


}