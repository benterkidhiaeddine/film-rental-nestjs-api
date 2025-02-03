import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /** Create a new customer */
  async create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.createCustomer(createCustomerDto);
  }

  /** Get all customers */
  async findAll() {
    return this.customerRepository.getCustomers({});
  }

  /** Get a customer by ID */
  async findOne(id: number) {
    const customer = await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  /** Update a customer */
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id); // Ensure the customer exists
    return this.customerRepository.updateCustomer(id, updateCustomerDto);
  }

  /** Delete a customer */
  async remove(id: number) {
    await this.findOne(id); // Ensure the customer exists
    return this.customerRepository.deleteCustomer(id);
  }
}
