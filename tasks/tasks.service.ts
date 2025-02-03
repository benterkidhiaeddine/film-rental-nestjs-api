import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  // tasks that runs on 12 Hour each day
  // Query all rentals and see if today in their time zone = return date in their time zone - 5 days
  // if so send a notification which is a log in this case

  // task that runs on 12 hour each day
  // Query all rentals and see if today in their time zone = return date in their time zone - 3 days
  // if so send a notification which is a log in this case
}
