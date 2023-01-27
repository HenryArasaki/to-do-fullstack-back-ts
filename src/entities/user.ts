import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,OneToMany } from "typeorm";
import { Task } from "./task";


@Entity({
    name:"USERS"
})
export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    passwordHash:string

    @Column()
    passwordSalt:string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    lastUpdatedAt:Date
}