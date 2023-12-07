import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeParent, TreeChildren } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ToDo } from './to_do.entity';

@Entity()
@Tree('closure-table', {
    closureTableName: 'to_do_list',
    ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
    descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
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

    @Column()
    parent_id: string;

    @TreeParent()
    parent: ToDo;
}
