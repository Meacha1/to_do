import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to_do.dto';
import { UpdateToDoDto } from './dto/update-to_do.dto';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isString, isUUID, max } from 'class-validator';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>,
  ) {}

  async create(createToDoDto: CreateToDoDto) {
    const newToDo = this.toDoRepository.create(createToDoDto);
    return this.toDoRepository.save(newToDo);
  }

  async findAll(): Promise<ToDo[]> {
    return this.toDoRepository.find({ relations: ['toDoList'] });
  }

  async findOne(id: string): Promise<ToDo> {
    const found = await this.toDoRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException('ToDo not found');
    }
    return found;
  }

  async update(id: string, updateToDoDto: UpdateToDoDto) {
    let updatedToDo = await this.findOne(id);
    updatedToDo = { ...updatedToDo, ...updateToDoDto };
    await this.toDoRepository.update(id, updatedToDo);
    return updatedToDo;
  }

  async remove(id: string) {
    const toDoAffected = await this.toDoRepository.delete(id);
    if (toDoAffected.affected === 0) {
      throw new NotFoundException('ToDo not found');
    }
  }
}
