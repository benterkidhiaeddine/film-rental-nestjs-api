import { Injectable } from '@nestjs/common';
import { Prisma, rental } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';

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

  /** Create a Rental */
  async createRental(data: CreateRentalDto): Promise<rental> {
    return this.prisma.rental.create({
      data: {
        rental_date: new Date(data.rental_date),
        inventory_id: data.inventory_id,
        customer_id: data.customer_id,
        return_date: new Date(data.return_date),
        staff_id: data.staff_id,
      },
    });
  }

  /** Update a Rental */
  async updateRental(
    id: number,
    data: Partial<CreateRentalDto>,
  ): Promise<rental> {
    return this.prisma.rental.update({
      where: { rental_id: id },
      data: {
        rental_date: data.rental_date ? new Date(data.rental_date) : undefined,
        inventory_id: data.inventory_id,
        customer_id: data.customer_id,
        return_date: data.return_date ? new Date(data.return_date) : undefined,
        staff_id: data.staff_id,
      },
    });
  }

  /** Delete a Rental */
  async deleteRental(id: number): Promise<rental> {
    return this.prisma.rental.delete({
      where: { rental_id: id },
    });
  }
}
