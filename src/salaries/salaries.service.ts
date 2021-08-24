import { Injectable } from '@nestjs/common';

@Injectable()
export class SalariesService {
  generateSalariesDates(startDate: Date) {
    return `This action returns all salaries`;
  }
}
