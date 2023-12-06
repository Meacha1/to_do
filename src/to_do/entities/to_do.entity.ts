import { Entity, Column, Tree, PrimaryGeneratedColumn, TreeChildren, TreeParent } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDoList } from './to_do_list.entity';


@Entity()
@Tree('closure-table')
export class ToDo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    total: number;
  
    @TreeChildren()
    todoLists: ToDoList[];
}
