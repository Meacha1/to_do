import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDoList } from './to_do_list.entity';


@Entity()
export class ToDo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    total: number;

    @OneToMany(() => ToDoList, toDoList => toDoList.parent)
    toDoList: ToDoList[];
}
