import * as dotenv from "dotenv"

const result = dotenv.config()

if(result.error){
    console.log("Error loading environment variables")
    process.exit(1)
}


import "reflect-metadata"
import * as express from 'express'
import { logger } from "./logger"
import { root } from './routes/root'
import { isInteger } from './utils'
import {AppDataSource} from './data-source'
import { getAllCourses } from "./routes/get-all-courses"
import { defaultErrorHandler } from "./middlewares/default-error-handler"

const cors = require("cors")

const app = express()


function setupExpress(){

    app.use(cors({origin:true}))

    app.route("/").get(root)

    app.route("/api/courses").get(getAllCourses)

    app.use(defaultErrorHandler)
}

function startServer(){

    let port:number

    const portArg = process.argv[2]

    const portEnv = process.env.PORT

    if (isInteger(portEnv)){
        port = parseInt(portEnv)
    }

    if (!port && isInteger(portArg)){
        port = parseInt(portArg)
    }

    if(!port){
        port = 9000
    }

    app.listen(port, ()=>logger.info(`Server is running on port ${port}`))

}



AppDataSource.initialize()
    .then(()=>{
        logger.info('DataSource initialized successfully')
        setupExpress()
        startServer()
    })
    .catch(error=>{
        logger.error('Error during dataSource initialization - ', error)
        process.exit(1)
    })