import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ToDoService } from './to_do.service';
import { CreateToDoDto } from './dto/create-to_do.dto';
import { UpdateToDoDto } from './dto/update-to_do.dto';

@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  create(@Body(ValidationPipe) createToDoDto: CreateToDoDto) {
    return this.toDoService.create(createToDoDto);
  }

  @Get()
  findAll() {
    return this.toDoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(id);
  }
}
