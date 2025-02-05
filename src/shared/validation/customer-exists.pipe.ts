import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidateCustomerExistsPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const customerId = parseInt(value, 10);

    if (isNaN(customerId)) {
      throw new BadRequestException('Customer ID must be a valid number.');
    }

    const customerExists = await this.prisma.customer.findUnique({
      where: { customer_id: customerId },
    });

    if (!customerExists) {
      throw new NotFoundException(
        `Customer with ID ${customerId} does not exist.`,
      );
    }

    return customerId;
  }
}
