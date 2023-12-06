import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class ToDoList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    percentComplete: number;

    @IsString()
    @Column()
    parentId: string;

    @IsNumber()
    @Column()
    amount: number;
}