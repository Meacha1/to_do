import { IsNotEmpty, IsNumber, IsString,  } from 'class-validator';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    percentComplete: number;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}