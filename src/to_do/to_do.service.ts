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
    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,
  ) {}

  async create(createToDoDto: CreateToDoDto) {
    const toDo = this.toDoRepository.create(createToDoDto);
    await this.toDoRepository.insert(toDo);
    return toDo;
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

async findMyToDoList(toDoTitle: string, id: string): Promise<ToDoList[]> {
  if (!isUUID(id) || !isString(toDoTitle)) {
      throw new BadRequestException('Invalid UUID or name');
  }
  const todo = await this.toDoRepository.findOne({where: {title: toDoTitle}});
  if (!todo) {
    throw new NotFoundException('ToDo not found');
  }
  const myToDoList = await this.toDoListRepository.find({where: {parentId: todo.id}})
  if (!myToDoList) {
    throw new NotFoundException('ToDoList not found');
  }
  return myToDoList;

}

  async update(id: string, updateToDoDto: UpdateToDoDto) {
    let updatedToDo = await this.findOne(id);
    updatedToDo = { ...updatedToDo, ...updateToDoDto };
    await this.toDoRepository.save(updatedToDo);
  }

  async remove(id: string) {
    const toDoAffected = await this.toDoRepository.delete(id);
    if (toDoAffected.affected === 0) {
      throw new NotFoundException('ToDo not found');
    }
  }
}
