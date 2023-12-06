import { Module } from '@nestjs/common';
import { ToDoService } from './to_do.service';
import { ToDoController } from './to_do.controller';
import { ToDoListController } from './to_do_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';
import { ToDoListService } from './to_do_list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToDo]),
    TypeOrmModule.forFeature([ToDoList]),

  ],
  controllers: [ToDoController, ToDoListController],
  providers: [ToDoService, ToDoListService],
})
export class ToDoModule {}
