import { Entity, Column, Tree, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDoList } from './to_do_list.entity';


@Entity()
@Tree("materialized-path")
export class ToDo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    total: number;

    @TreeParent()
    parent: ToDo;
  
    @TreeChildren()
    todoLists: ToDoList[];
}
