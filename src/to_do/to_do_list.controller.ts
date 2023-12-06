import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToDoListService } from './to_do_list.service';
import { CreateToDoListDto } from './dto/create-to_do_list.dto';
import { UpdateToListDoDto } from './dto/update-to_do_list.dto';

@Controller('to-do-list')
export class ToDoController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Post()
  create(@Body() createToDoListDto: CreateToDoListDto) {
    return this.toDoListService.create(createToDoListDto);
  }

  @Get()
  findAll() {
    return this.toDoListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoListService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoListDto: UpdateToListDoDto) {
    return this.toDoListService.update(id, updateToDoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListService.remove(id);
  }
}
