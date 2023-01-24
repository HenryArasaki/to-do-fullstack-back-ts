import * as dotenv from "dotenv"

const result = dotenv.config()

if(result.error){
    console.log("Error loading environment variables")
    process.exit(1)
}


import "reflect-metadata"
import * as express from 'express'
import { root } from './routes/root'
import { isInteger } from './utils'
import {AppDataSource} from './data-source'
import {routes} from './routes.tsx'


const cors = require("cors")

const app = express()


function setupExpress(){

    app.use(cors({origin:true}))

    app.use(bodyParser.json())

    app.use(routes)

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

    app.listen(port, ()=>console.log(`Server is running on port ${port}`))

}



AppDataSource.initialize()
    .then(()=>{
        setupExpress()
        startServer()
    })
    .catch(error=>{
        process.exit(1)
    })