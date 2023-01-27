import {PrimaryGeneratedColumn,Column,Entity,CreateDateColumn,UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm'
import { User } from './user'

@Entity({
    name:"TASKS"
})
export class Task{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    done:boolean

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({
        name: "userId"
    })
    user: User;

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    lastUpdatedAt:Date
}