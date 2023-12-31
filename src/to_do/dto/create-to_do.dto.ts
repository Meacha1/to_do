import { IsNotEmpty, IsNumber, IsString,  } from 'class-validator';

export class CreateToDoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    total: number;
}
