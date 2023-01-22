import {Request, Response, NextFunction} from 'express'
import { logger } from '../logger'


export function checkIfAdmin(req:Request,res:Response,next:NextFunction){


    const user = req["user"]

    if(!user?.isAdmin){
        logger.error("The user is not an admin, access denied")
        res.sendStatus(403)
        return
    }

    next()


}