import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';

@Injectable()
export class SalariesService {
  findAll(createSalaryDto: CreateSalaryDto) {
    return `This action returns all salaries`;
  }
}
