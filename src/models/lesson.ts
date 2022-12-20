import {PrimaryGeneratedColumn,Column,Entity,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm'
import { Course } from './course'

@Entity({
    name:"LESSONS"
})
export class Lesson{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    duration:string

    @Column()
    seqNo:number

    @OneToMany(()=>Lesson, lesson=>lesson.course)
    course: Course

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    lastUpdatedAt:Date
}