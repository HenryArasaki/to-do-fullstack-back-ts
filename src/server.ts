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
import { findCourseByUrl } from "./routes/find-crouse-by-url"
import { findLessonsForCourse } from "./routes/find-lessons-for-course"
import { updateCourse } from "./routes/update-course"
import bodyParser = require("body-parser")
import { createCourse } from "./routes/create-course"
import {deleteCourseAndLessons } from "./routes/delete-course"
import { createUser } from "./routes/create-user"
import { login } from "./routes/login"
import { checkIfAuthenticated } from "./middlewares/authentication-middleware"
import { checkIfAdmin } from "./middlewares/admin-only.middleware"

const cors = require("cors")

const app = express()


function setupExpress(){

    app.use(cors({origin:true}))

    app.use(bodyParser.json())

    app.route("/").get(root)

    app.route("/api/courses").get(checkIfAuthenticated,getAllCourses)

    app.route("/api/courses/:courseUrl").get(checkIfAuthenticated,findCourseByUrl)

    app.route("/api/courses/:courseId/lessons").get(checkIfAuthenticated,findLessonsForCourse)

    app.route("/api/courses/:courseId").patch(checkIfAuthenticated,updateCourse)

    app.route("/api/courses/").post(checkIfAuthenticated,createCourse)

    app.route("/api/courses/:courseId").delete(checkIfAuthenticated,deleteCourseAndLessons)

    app.route("/api/users").post(checkIfAuthenticated,checkIfAdmin,createUser)

    app.route("/api/login").post(login)

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