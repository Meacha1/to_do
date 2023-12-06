import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class ToDoList {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column()
    title: string;

    @IsNumber()
    @Column()
    percentComplete: number;

    @IsNumber()
    @Column()
    amount: number;
}