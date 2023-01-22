import {Request, Response, NextFunction} from 'express'
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

export function checkIfAuthenticated(req:Request,res:Response,next:NextFunction){
    const authJwtToken = req.headers.authorization

    if (!authJwtToken){
        res.sendStatus(403)
        return
    }

    checkJwtValidity(authJwtToken)
    .then(user=>{


        req["user"] = user

        next()
    })
    .catch(err=>{
        res.sendStatus(403)
    })


}


async function checkJwtValidity(authJwtToken:string){

    const user = await jwt.verify(authJwtToken,JWT_SECRET)


    return user
}