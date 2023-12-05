import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    title: string;

    @IsNumber()
    amount: number;
}