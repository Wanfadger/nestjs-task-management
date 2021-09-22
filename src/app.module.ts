import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule , TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'wanfadgerdb',
    password: 'password',
    database: 'task',
    synchronize: true,
    autoLoadEntities:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
