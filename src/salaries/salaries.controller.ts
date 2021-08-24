import { Controller, Get } from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get()
  findAll() {
    return this.salariesService.findAll();
  }
}
