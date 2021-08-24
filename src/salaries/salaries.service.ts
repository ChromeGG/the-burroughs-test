import { Injectable } from '@nestjs/common';

@Injectable()
export class SalariesService {
  generateSalariesDates(startDate: Date) {
    console.log(startDate);
    return `This action `;
  }
}
