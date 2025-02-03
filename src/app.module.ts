import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalModule } from './rental/rental.module';
import { PrismaModule } from './prisma/prisma.module';
import { RentalController } from './rental/rental.controller';
import { RentalService } from './rental/rental.service';
import { RentalRepository } from './rental/rental.repository';
import { UniqueRentalPipe } from './shared/validation/unique-rental-pipe';
import { RentalPeriodConstraint } from './shared/validation/rental-period-constraint';
import { CustomerModule } from './customer/customer.module';
import { CustomerRepository } from './customer/customer.repository';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from 'tasks/tasks.module';

@Module({
  imports: [
    PrismaModule,
    RentalModule,
    CustomerModule,
    TasksModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, RentalController, CustomerController],
  providers: [
    // Repositories
    CustomerRepository,
    RentalRepository,
    // Services
    AppService,
    RentalService,
    CustomerService,
    // Validators
    UniqueRentalPipe,
    RentalPeriodConstraint,
  ],
})
export class AppModule {}
