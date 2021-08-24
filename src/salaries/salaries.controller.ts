import { Controller, Get, Header, Param } from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { StartDateDto } from './dto/create-salary.dto';

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get(':startDate')
  @Header('Content-type', 'text/csv')
  async getSalaries(@Param() startDateDto: StartDateDto) {
    const { startDate } = startDateDto;
    return this.salariesService.generateSalariesDates(new Date(startDate));
  }
}
