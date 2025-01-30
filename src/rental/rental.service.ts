import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
  constructor(private repository: RentalRepository) {}
  async create(createRentalDto: CreateRentalDto) {
    const created_rental = await this.repository.createRental(createRentalDto);
    return created_rental;
  }

  async findAll() {
    const rentals = await this.repository.getRental({});
    return rentals;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return this.repository.updateRental(id, updateRentalDto);
  }
}
