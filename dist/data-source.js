"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var course_1 = require("./models/course");
var lesson_1 = require("./models/lesson");
var user_1 = require("./models/user");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: true,
    entities: [
        course_1.Course,
        lesson_1.Lesson,
        user_1.User
    ],
    synchronize: true,
    logging: true
});
