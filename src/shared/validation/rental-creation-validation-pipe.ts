import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Import Prisma service
import { CreateRentalDto } from 'src/rental/dto/create-rental.dto';

@Injectable()
export class ValidateRentalPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: CreateRentalDto, metadata: ArgumentMetadata) {
    const { customer_id, inventory_id, staff_id } = value;

    // Validate if the customer exists
    const customerExists = await this.prisma.customer.findUnique({
      where: { customer_id },
    });

    if (!customerExists) {
      throw new BadRequestException(
        `Customer with ID ${customer_id} does not exist.`,
      );
    }

    // Validate if the inventory item exists
    const inventoryExists = await this.prisma.inventory.findUnique({
      where: { inventory_id },
    });

    if (!inventoryExists) {
      throw new BadRequestException(
        `Inventory item with ID ${inventory_id} does not exist.`,
      );
    }

    // Validate if the inventory item exists
    const staffExists = await this.prisma.staff.findUnique({
      where: { staff_id },
    });

    if (!staffExists) {
      throw new BadRequestException(
        `staff item with ID ${staff_id} does not exist.`,
      );
    }

    // Return the value if validation passes
    return value;
  }
}
