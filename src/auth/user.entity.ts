import { Exclude } from "class-transformer";
import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { Role } from "./user-role.enum";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({unique: true})
    username:string;
    @Column()
    password:string;
    @Column()
    role:Role;
    @OneToMany(()=>Task, (task)=> task.user, {eager:true})//eager:true let u fetch tasks in the same query of fetching users
    @Exclude({toPlainOnly:true})
    tasks: Task[];
}