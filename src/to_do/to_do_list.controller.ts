import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
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

  @Get('/list/:parentId')
  findMylist(@Param('parentId') parentId: string) {
    return this.toDoListService.findMylist(parentId);
  }

  @Get('/:toDoTitle/:id')
  findOne(@Param('id') id: string, @Param('toDoTitle') toDoTitle: string) {
   return this.toDoListService.findOne(toDoTitle, id);
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
