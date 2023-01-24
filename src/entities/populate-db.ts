import * as dotenv from "dotenv"

const result = dotenv.config()

import "reflect-metadata"

import { COURSES } from "./db-data";
import { AppDataSource } from "../data-source";
import { Course } from "./course";
import { DeepPartial } from "typeorm";
import { Lesson } from "./lesson";

async function populateDb() {
    
    await AppDataSource.initialize()

    console.log("database connection ready")

    const courses = Object.values(COURSES) as DeepPartial<Course>[]

    const courseRepository = AppDataSource.getRepository(Course)
    
    const lessonsRepository = AppDataSource.getRepository(Lesson)



    for (let courseData of courses){
        const course = courseRepository.create(courseData)

        await courseRepository.save(course)

        for (let lessonData of courseData.lessons){
            const lesson = lessonsRepository.create(lessonData)

            lesson.course = course

            await lessonsRepository.save(lesson)
        }
    }

    const totalCourses = await courseRepository.createQueryBuilder().getCount()
    const totalLessons = await lessonsRepository.createQueryBuilder().getCount()


    console.log(`data inserted - courses ${totalCourses}, lessons ${totalLessons}`)
}

populateDb()
    .then(()=>{
        console.log("Finished populating db")
        process.exit(0)
    })
    .catch(err=>{
        console.error("error populating db, ",err)
    })