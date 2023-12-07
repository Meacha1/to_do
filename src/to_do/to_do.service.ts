import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to_do.dto';
import { UpdateToDoDto } from './dto/update-to_do.dto';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { isString, isUUID, max } from 'class-validator';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>,
    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,
    @InjectRepository(ToDo)
    private readonly toDoTreeRepository: TreeRepository<ToDo>,
  ) {}

  async create(createToDoDto: CreateToDoDto) {
    const toDo = this.toDoTreeRepository.create(createToDoDto);
    await this.toDoTreeRepository.insert(toDo);
  }


  async findAll(): Promise<ToDo[]> {
    return this.toDoTreeRepository.findTrees();
  }

  async findOne(id: string): Promise<ToDo> {
    return await this.toDoTreeRepository.findOne({ where: { id: id } });
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
    if (!updatedToDo) {
      throw new NotFoundException('ToDo not found');
    }
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
