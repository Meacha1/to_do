import { Entity, Column, Tree, PrimaryGeneratedColumn, TreeChildren, TreeParent } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDoList } from './to_do_list.entity';


@Entity()
@Tree('closure-table', {
    closureTableName: 'to_do_closure',
    ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
    descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
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
