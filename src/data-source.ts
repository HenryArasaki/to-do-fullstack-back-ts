import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Task } from "./entities/task";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    port:parseInt(process.env.DB_PORT),
    database:process.env.DB_NAME,
    ssl:true,
    entities:[
       User,Task
    ],
    synchronize:true,
    logging:true

})