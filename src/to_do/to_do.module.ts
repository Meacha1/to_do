import { Module } from '@nestjs/common';
import { ToDoService } from './to_do.service';
import { ToDoController } from './to_do.controller';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
