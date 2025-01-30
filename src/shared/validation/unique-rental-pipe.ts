import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { RentalRepository } from '../../rental/rental.repository';
import { CreateRentalDto } from 'src/rental/dto/create-rental.dto';

@Injectable()
export class UniqueRentalPipe implements PipeTransform {
  constructor(private rentalRepository: RentalRepository) {}

  async transform(value: CreateRentalDto, metadata: ArgumentMetadata) {
    const rentalDate = new Date(value.rental_date).toISOString();
    const { customer_id, inventory_id } = value;

    // Check if a rental with the same rental_date, customer_id, and inventory_id exists
    const existingRental = await this.rentalRepository.getRental({
      where: {
        AND: [
          { rental_date: { equals: rentalDate } },
          { customer_id: { equals: customer_id } },
          { inventory_id: { equals: inventory_id } },
        ],
      },
    });

    // If an existing rental record is found, throw an error
    if (existingRental && existingRental.length > 0) {
      throw new BadRequestException(
        'A rental record with the same rental_date, customer_id, and inventory_id already exists.',
      );
    }

    // Return the value if validation passes
    return value;
  }
}
