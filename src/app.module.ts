import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './to_do/to_do.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './to_do/entities/to_do.entity';
import { ToDoList } from './to_do/entities/to_do_list.entity';

@Module({
  imports: [ToDoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mm123321123',
      database: 'todo',
      entities: [ToDo, ToDoList],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
