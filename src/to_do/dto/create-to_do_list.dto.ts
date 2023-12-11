import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min,  } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateToDoListDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    percentageComplete: number;

    @IsString()
    @IsUUID()
    parentId?: string;
}