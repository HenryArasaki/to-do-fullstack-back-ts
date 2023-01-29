import {Router} from 'express'

import { getAllTasks } from "./controllers/get-all-tasks"
import { updateCourse } from "./controllers/update-task"
import { createTask } from "./controllers/create-task"
import {deleteTask } from "./controllers/delete-task"
import { createUser } from "./controllers/create-user"
import { login } from "./controllers/login"
import { checkIfAuthenticated } from "./middlewares/authentication-middleware"

export const routes = Router()


routes.get("/api/tasks",checkIfAuthenticated,getAllTasks)

routes.patch("/api/tasks/:courseId",checkIfAuthenticated,updateCourse)

routes.post("/api/tasks/",checkIfAuthenticated,createTask)

routes.delete("/api/tasks/:courseId",checkIfAuthenticated,deleteTask)

// routes.post("/api/users",checkIfAuthenticated,checkIfAdmin,createUser)
routes.post("/api/users",createUser)

routes.post("/api/login",login)


