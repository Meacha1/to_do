import { IsNotEmpty, IsNumber, IsString, IsUUID,  } from 'class-validator';
import { CreateToDoDto } from './create-to_do.dto';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    percentageComplete: number;

    @IsString()
    @IsUUID()
    parentId?: string;

    // todo: CreateToDoDto;
}