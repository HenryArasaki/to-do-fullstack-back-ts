import * as dotenv from "dotenv"

const result = dotenv.config()


import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Course } from "./course"
import { Lesson } from "./lesson"

async function deleteDb(){

    await AppDataSource.initialize()

    await AppDataSource.getRepository(Lesson).delete({})
    await AppDataSource.getRepository(Course).delete({})
}

deleteDb()
    .then(()=>{
        console.log('Finished deleting database')
        process.exit(0)
    })
    .catch(err=>{
        console.error('Error deleting database, ', err)
    })