import { Injectable } from '@nestjs/common';
import { Prisma, rental } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentalRepository {
  constructor(private prisma: PrismaService) {}

  async getRental(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.rentalWhereUniqueInput;
    where?: Prisma.rentalWhereInput;
    orderBy?: Prisma.rentalOrderByWithRelationInput;
  }): Promise<rental[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.rental.findMany({ skip, take, cursor, where, orderBy });
  }
}
