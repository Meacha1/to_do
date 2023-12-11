import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ToDoListService } from './to_do_list.service';
import { CreateToDoListDto } from './dto/create-to_do_list.dto';
import { UpdateToListDoDto } from './dto/update-to_do_list.dto';

@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Post()
  create(@Body(ValidationPipe) createToDoListDto: CreateToDoListDto) {
    return this.toDoListService.create(createToDoListDto);
  }

  @Get()
  findAll() {
    return this.toDoListService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateToDoListDto: UpdateToListDoDto) {
    return this.toDoListService.update(id, updateToDoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListService.remove(id);
  }
}
