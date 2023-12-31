import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to_do_list.dto';
import { UpdateToListDoDto } from './dto/update-to_do_list.dto';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>,
  ) {}


  async create(createToDoListDto: CreateToDoListDto) {
    const toDo = await this.toDoRepository.findOne({where: {id: createToDoListDto.parentId}})
    if (!toDo) {
      throw new NotFoundException('ToDo not found');
    }
    const otherToDoList = await this.toDoListRepository.find({where: {parentId: createToDoListDto.parentId}});
    let otherToDoListAmount = 0;
    otherToDoList.forEach(element => {
      otherToDoListAmount += element.amount;
    });

    let otherToDoListPercent = 0;
    otherToDoList.forEach(element => {
      otherToDoListPercent += element.percentageComplete;
    });
    if (Number(otherToDoListPercent) + Number(createToDoListDto.percentageComplete) > 100) {
      throw new BadRequestException('Total percentageComplete of ToDoList is greater than 100');
    }
    const remainingAmount = toDo.total - otherToDoListAmount;
    const thisMaxamount = createToDoListDto.percentageComplete * toDo.total / 100.0;
    const thisAmount = Math.min(remainingAmount, thisMaxamount);
    const toDoList = {...createToDoListDto, amount: thisAmount};
    await this.toDoListRepository.create(toDoList);
    await this.toDoListRepository.save(toDoList);    
    return toDoList;
  }

  async findAll() {
    return await this.toDoListRepository.find();
  }

  async update(id: string, updateToDoListDto: UpdateToListDoDto) {
    let toBeUpdated = await this.toDoListRepository.findOne({where: {id: id}});
    if (!toBeUpdated) {
      throw new NotFoundException('ToDo not found');
    }
    const toDo = await this.toDoRepository.findOne({where: {id: toBeUpdated.parentId}})
    if (!toDo) {
      throw new NotFoundException('ToDo not found');
    }
    const otherToDoList = await this.toDoListRepository.find({where: {parentId: toBeUpdated.parentId}});
    if (updateToDoListDto.percentageComplete === undefined) {
      toBeUpdated = { ...toBeUpdated, ...updateToDoListDto };
      await this.toDoListRepository.update(id, toBeUpdated);
      return;
    }

    let otherToDoListAmount = 0;
    otherToDoList.forEach(element => {
      if (element.id !== id) {
        otherToDoListAmount += element.amount;
      }
    });

    let percentageSum = 0;
    if (updateToDoListDto.percentageComplete !== undefined) {
      otherToDoList.forEach(element => {
        percentageSum += element.percentageComplete;
      });
      percentageSum -= toBeUpdated.percentageComplete;
      if (Number(percentageSum) + Number(updateToDoListDto.percentageComplete) > 100) {
        throw new BadRequestException('Total percentageComplete of ToDoList is greater than 100');
      }
    }

    const remainingAmount = toDo.total - otherToDoListAmount;
    const thisMaxamount = updateToDoListDto.percentageComplete * toDo.total / 100.0;
    const thisAmount = Math.min(remainingAmount, thisMaxamount);
    const Updated = { ...toBeUpdated, ...updateToDoListDto, amount: thisAmount };
    await this.toDoListRepository.update(id, Updated);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
        throw new BadRequestException('Invalid UUID');
    }
    const toDoAffected = await this.toDoListRepository.delete(id);
    if (toDoAffected.affected === 0) {
      throw new NotFoundException('ToDo not found');
    }
  }
}
