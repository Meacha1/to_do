import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to_do_list.dto';
import { UpdateToListDoDto } from './dto/update-to_do_list.dto';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>,
    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,
  ) {}


  async create(createToDoListDto: CreateToDoListDto) {
    await this.toDoRepository.insert(createToDoListDto);
  }

  async findAll() {
    return await this.toDoRepository.find();
  }

  async findOne(id: string): Promise<ToDo> {
    return await this.toDoRepository.findOne({where: {id: id}});
  }

  async update(id: string, updateToDoListDto: UpdateToListDoDto) {
    let updatedToDo = await this.findOne(id);
    if (!updatedToDo) {
      throw new NotFoundException('ToDo not found');
    }
    updatedToDo = {...updatedToDo, ...updateToDoListDto};
    await this.toDoRepository.update(id, updatedToDo);
  }

  async remove(id: string) {
    const toDoAffected = await this.toDoRepository.delete(id);
    if (toDoAffected.affected === 0) {
      throw new NotFoundException('ToDo not found');
    }
  }
}
