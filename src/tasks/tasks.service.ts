import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { RentalRepository } from '../rental/rental.repository';
import * as moment from 'moment-timezone';
import { DateTime } from 'luxon';
// Interface for the cron tasks
export interface SerializedCronJob {
  name: string; // Unique name of the job
  running: boolean; // Whether the job is currently running
  lastExecution: string | null; // Last execution time as an ISO string or null
  cronExpression: string | DateTime<boolean>; // The cron schedule pattern
  runOnce: boolean; // Whether the job should run once
  waitForCompletion: boolean; // If it waits for completion before scheduling next
}

@Injectable()
export class TasksService {
  constructor(
    private rentalRepository: RentalRepository,
    private scheduelerRegistery: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  // Task that runs every 12 hours
  @Cron('10 * * * * *', { name: '5-days-reminder' }) // Runs every 12 hours
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
  @Cron('0 0 */12 * * *', { name: '3-days-reminder' }) // Runs every 12 hours
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

  getTasks() {
    const tasks = this.scheduelerRegistery.getCronJobs();
    // Convert Map to an array of JSON serializable objects
    const taskArray: SerializedCronJob[] = [];
    tasks.forEach((task, name) => {
      taskArray.push({
        name,
        running: task.running,
        lastExecution: task.lastExecution
          ? task.lastExecution.toISOString()
          : null,
        cronExpression: task.cronTime.source,
        runOnce: task.runOnce,
        waitForCompletion: task.waitForCompletion,
      });
    });
    return taskArray;
  }

  // Get a specific task by name
  getTaskByName(name: string): SerializedCronJob {
    const task = this.scheduelerRegistery.getCronJob(name);
    if (!task) {
      throw new NotFoundException(`Task with name "${name}" not found.`);
    }

    return {
      name,
      running: task.running,
      lastExecution: task.lastExecution
        ? task.lastExecution.toISOString()
        : null,
      cronExpression: task.cronTime.source,
      runOnce: task.runOnce,
      waitForCompletion: task.waitForCompletion,
    };
  }

  // Stop a running task
  stopTask(name: string): SerializedCronJob {
    const task = this.scheduelerRegistery.getCronJob(name);
    if (!task) {
      throw new NotFoundException(`Task with name "${name}" not found.`);
    }

    if (!task.running) {
      throw new BadRequestException(`Task "${name}" is already stopped.`);
    }

    task.stop();
    this.logger.warn(`Task "${name}" has been stopped.`);
    return {
      name,
      running: task.running,
      lastExecution: task.lastExecution
        ? task.lastExecution.toISOString()
        : null,
      cronExpression: task.cronTime.source,
      runOnce: task.runOnce,
      waitForCompletion: task.waitForCompletion,
    };
  }

  // Start a stopped task
  startTask(name: string): SerializedCronJob {
    const task = this.scheduelerRegistery.getCronJob(name);
    if (!task) {
      throw new NotFoundException(`Task with name "${name}" not found.`);
    }

    if (task.running) {
      throw new BadRequestException(`Task "${name}" is already running.`);
    }

    task.start();
    this.logger.log(`Task "${name}" has been started.`);
    return {
      name,
      running: task.running,
      lastExecution: task.lastExecution
        ? task.lastExecution.toISOString()
        : null,
      cronExpression: task.cronTime.source,
      runOnce: task.runOnce,
      waitForCompletion: task.waitForCompletion,
    };
  }
}
