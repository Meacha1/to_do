import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDo } from './to_do.entity';

@Entity()
export class ToDoList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    percentageComplete: number;

    @IsNumber()
    @Column()
    amount: number;

    @ManyToOne(() => ToDo, toDo => toDo.toDoList)
    parent: ToDo;

    @Column()
    parentId: string;
}
