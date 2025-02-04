import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RentalRepository } from 'src/rental/rental.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksController } from './tasks.controller';

@Module({
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, RentalRepository, PrismaService],
})
export class TasksModule {}
