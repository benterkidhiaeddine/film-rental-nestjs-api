import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { RentalRepository } from 'src/rental/rental.repository';
import * as moment from 'moment-timezone';
@Injectable()
export class TasksService {
  constructor(private rentalRepository: RentalRepository) {}
  private readonly logger = new Logger(TasksService.name);

  // Task that runs every 12 hours
  @Cron('1 * * * * *') // Runs every 12 hours
  async checkRentalReturnDateFiveDaysBefore() {
    const rentals = await this.rentalRepository.getRental({});
    rentals.forEach((rental) => {
      // Assuming rental has customer time zone and return_date
      const customerTimeZone = rental.customer.timezone; // Assuming customer object has a timezone field
      const returnDate = moment.tz(rental.return_date, customerTimeZone);
      const fiveDaysBefore = returnDate.clone().subtract(5, 'days');

      const currentTime = moment.tz(customerTimeZone); // Current time in customer time zone

      // Check if today is exactly 5 days before the return date
      if (
        currentTime.isSame(fiveDaysBefore, 'day') &&
        currentTime.isSame(fiveDaysBefore, 'month') &&
        currentTime.isSame(fiveDaysBefore, 'year')
      ) {
        this.logger.debug(
          `Rental ID ${rental.rental_id} - Notification: 5 days left until return for customer ${rental.customer.first_name} ${rental.customer.last_name}.`,
        );
      }
    });
  }

  // Task that runs every 12 hours
  @Cron('0 0 */12 * * *') // Runs every 12 hours
  async checkRentalReturnDateThreeDaysBefore() {
    const rentals = await this.rentalRepository.getRental({});

    rentals.forEach((rental) => {
      // Assuming rental has customer time zone and return_date
      const customerTimeZone: any = rental.customer.timezone; // Assuming customer object has a timezone field
      const returnDate = moment.tz(rental.return_date, customerTimeZone);
      const threeDaysBefore = returnDate.clone().subtract(3, 'days');

      const currentTime = moment.tz(customerTimeZone); // Current time in customer time zone

      // Check if today is exactly 3 days before the return date
      if (
        currentTime.isSame(threeDaysBefore, 'day') &&
        currentTime.isSame(threeDaysBefore, 'month') &&
        currentTime.isSame(threeDaysBefore, 'year')
      ) {
        this.logger.debug(
          `Rental ID ${rental.rental_id} - Notification: 3 days left until return for customer ${rental.customer.first_name} ${rental.customer.last_name}.`,
        );
      }
    });
  }
}
