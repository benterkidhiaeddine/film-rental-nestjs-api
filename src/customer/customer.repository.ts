import { Injectable } from '@nestjs/common';
import { Prisma, customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  /** Get Customers */
  async getCustomers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.customerWhereUniqueInput;
    where?: Prisma.customerWhereInput;
    orderBy?: Prisma.customerOrderByWithRelationInput;
  }): Promise<customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /** Get a single Customer by ID */
  async getCustomerById(customer_id: number): Promise<customer | null> {
    return this.prisma.customer.findUnique({
      where: { customer_id },
    });
  }

  /** Create a Customer */
  async createCustomer(data: CreateCustomerDto): Promise<customer> {
    return this.prisma.customer.create({
      data: {
        store_id: data.store_id,
        address_id: data.address_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        activebool: data.activebool,
      },
    });
  }

  /** Update a Customer */
  async updateCustomer(
    customer_id: number,
    data: UpdateCustomerDto,
  ): Promise<customer> {
    return this.prisma.customer.update({
      where: { customer_id },
      data: {
        store_id: data.store_id,
        address_id: data.address_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        activebool: data.activebool,
      },
    });
  }

  /** Delete a Customer */
  async deleteCustomer(customer_id: number): Promise<customer> {
    return this.prisma.customer.delete({
      where: { customer_id },
    });
  }
}
