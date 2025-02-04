import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RentalRepository } from 'src/rental/rental.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TasksService, RentalRepository, PrismaService],
})
export class TasksModule {}
