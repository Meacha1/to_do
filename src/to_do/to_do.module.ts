import { Module } from '@nestjs/common';
import { ToDoService } from './to_do.service';
import { ToDoController } from './to_do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entities/to_do.entity';
import { ToDoList } from './entities/to_do_list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToDo]),
    TypeOrmModule.forFeature([ToDoList]),

  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
