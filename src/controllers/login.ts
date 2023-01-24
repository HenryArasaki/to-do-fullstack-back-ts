import {NextFunction, Request,Response} from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entities/user'
import { calculatePasswordHash } from '../utils'

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET


export async function login(req:Request,res:Response, next:NextFunction){


    try{

        const { email, password} = req.body

        if(!email){
            throw "Could not extract the email from the request"
        }
        if(!password){
            throw "Could not extract the password from the request"
        }

        const user = await AppDataSource.getRepository(User).createQueryBuilder("users").where("email = :email",{email}).getOne()

        if(!user){
            const message = "Login denied"
            res.status(403).json({message})
            return
        }

        const passwordHash = await calculatePasswordHash(password,user.passwordSalt)

        if(passwordHash != user.passwordHash){
            const message = "Login denied"
            res.status(403).json({message})
            return
        }

        const {pictureUrl, isAdmin} = user

        const authJwt = {
            userId:user.id,
            email,
            isAdmin
        }

        const authJwtToken = await jwt.sign(authJwt,JWT_SECRET)

        res.status(200).json({
            user:{
                email,
                pictureUrl,
                isAdmin
            },
            authJwtToken
        })


    }
    catch(error){
        return next(error)
    }
}