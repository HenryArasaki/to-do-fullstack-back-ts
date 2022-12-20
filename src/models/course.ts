import {PrimaryGeneratedColumn,Column,Entity,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from 'typeorm'
import { Lesson } from './lesson'


@Entity({
    name:"COURSES"
})
export class Course{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    seqNo:number

    @Column()
    title:string

    @Column()
    iconUrl:string

    @Column()
    longDescription:string

    @Column()
    category:string

    @ManyToOne(()=>Course,course=>course.lessons)
    @JoinColumn({
        name:"courseId"
    })
    lessons:Lesson[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    lastUpdatedAt:Date
}