import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoListDto } from './create-to_do_list.dto';

export class UpdateToListDoDto extends PartialType(CreateToDoListDto) {}