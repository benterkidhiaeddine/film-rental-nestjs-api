import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalModule } from './rental/rental.module';
import { PrismaModule } from './prisma/prisma.module';
import { RentalController } from './rental/rental.controller';
import { RentalService } from './rental/rental.service';
import { RentalRepository } from './rental/rental.repository';

@Module({
  imports: [RentalModule, PrismaModule],
  controllers: [AppController, RentalController],
  providers: [AppService, RentalService, RentalRepository],
})
export class AppModule {}
