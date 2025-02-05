import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Import Prisma service
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';

@Injectable()
export class ValidateCustomerPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: UpdateCustomerDto, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Request body is missing.');
    }
    const store_id = value.store_id;
    const address_id = value.store_id;
    // Validate if the store exists

    if (store_id) {
      const storeExists = await this.prisma.store.findUnique({
        where: {
          store_id: store_id,
        },
      });

      if (!storeExists) {
        throw new BadRequestException(
          `Store with ID ${store_id} does not exist.`,
        );
      }
    }
    // Validate if the address exists
    if (address_id) {
      const addressExists = await this.prisma.address.findUnique({
        where: { address_id: address_id },
      });

      if (!addressExists) {
        throw new BadRequestException(
          `Address with ID ${address_id} does not exist.`,
        );
      }

      // Return the value if validation passes
    }
    return value;
  }
}
