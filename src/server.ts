import * as dotenv from 'dotenv'

const result = dotenv.config()

if(result.error){
    console.log("Error loading environment variables")
    process.exit(1)
}

console.log(process.env.PORT)

import * as express from 'express'
import { root } from './routes/root'
import { inInteger } from './utils'

const app = express()


function setupExpress(){

    app.route("/").get(root)

}

function startServer(){

    let port:number

    const portArg = process.argv[2]

    const portEnv = process.env.PORT

    if (inInteger(portEnv)){
        port = parseInt(portEnv)
    }

    if (!port && inInteger(portArg)){
        port = parseInt(portArg)
    }

    if(!port){
        port = 9000
    }

    app.listen(port, ()=>console.log("Server is running"))

}

setupExpress()

startServer()