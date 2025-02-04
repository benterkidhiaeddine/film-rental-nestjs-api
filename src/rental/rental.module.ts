import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RentalRepository } from './rental.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  exports: [RentalRepository],
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository],
})
export class RentalModule {}
