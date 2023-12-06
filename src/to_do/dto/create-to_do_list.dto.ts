import { IsNotEmpty, IsNumber, IsString, IsUUID,  } from 'class-validator';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    percentComplete: number;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    parentId: string;

    // @IsNumber()
    // @IsNotEmpty()
    // amount: number;
}