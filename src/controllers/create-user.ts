import { NextFunction,Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { calculatePasswordHash } from "../utils";

const crypto = require("crypto")

export async function createUser(req:Request, res:Response, next:NextFunction){

    try{

        const {email, pictureUrl,password,isAdmin} = req.body

        if(!email){
            throw "Could not extract the email from the request"
        }

        if(!password){
            throw "Could not extract the password from the request"
        }

        const repository = AppDataSource.getRepository(User)

        const user = await repository.createQueryBuilder("user").where("email=:email",{email}).getOne()

        if(user){
            const message = `User with email ${email} already exists`
            res.status(500).json({message})
            return
        }

        const passwordSalt = crypto.randomBytes(64).toString('hex')

        const passwordHash = await calculatePasswordHash(password,passwordSalt)

        const newUser = repository.create({email,pictureUrl,isAdmin,passwordHash,passwordSalt})

        await AppDataSource.manager.save(newUser)


        res.status(200).json({email,pictureUrl,isAdmin})


    }
    catch(error){
        return next(error)
    }

}