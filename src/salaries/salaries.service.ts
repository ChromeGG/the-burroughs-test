import { Injectable } from '@nestjs/common';
import { SalaryMonth } from './interfaces/SalaryMonth.interface';
import {
  isSunday,
  isSaturday,
  eachMonthOfInterval,
  subDays,
  addMonths,
  isWeekend,
  nextWednesday,
} from 'date-fns';
import {
  toIsoDate,
  getDayFromMonth,
  convertToCSV,
  removeTimeZone,
} from './helper';

@Injectable()
export class SalariesService {
  generateSalariesDates(startDate: Date) {
    const salaries: SalaryMonth[] = [];
    const interval = {
      start: addMonths(startDate, 1),
      end: addMonths(startDate, 12),
    };

    const daysInterval = eachMonthOfInterval(interval).map((date) =>
      removeTimeZone(date),
    );

    for (const day of daysInterval) {
      let payday: Date;
      if (isSaturday(day)) {
        payday = subDays(day, 1);
      } else if (isSunday(day)) {
        payday = subDays(day, 2);
      } else {
        payday = day;
      }

      const fifteenth = getDayFromMonth(day, 15);
      let bonus = fifteenth;
      if (isWeekend(fifteenth)) {
        bonus = nextWednesday(fifteenth);
      }

      salaries.push({ payday, bonus });
    }

    const isoFormattedSalaries = salaries.map(({ payday, bonus }) => {
      return { payday: toIsoDate(payday), bonus: toIsoDate(bonus) };
    });

    return convertToCSV(isoFormattedSalaries);
  }
}
