import { Test, TestingModule } from '@nestjs/testing';
import { SalariesService } from './salaries.service';

describe('SalariesService', () => {
  let service: SalariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalariesService],
    }).compile();

    service = module.get<SalariesService>(SalariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create correct data for non leap year', async () => {
    const results = await service.generateSalariesDates(new Date('2021-01-05'));

    expect(results).toMatchInlineSnapshot(`
      "payday,bonus
      2021-02-01,2021-02-15
      2021-03-01,2021-03-15
      2021-04-01,2021-04-15
      2021-04-30,2021-05-19
      2021-06-01,2021-06-15
      2021-07-01,2021-07-15
      2021-07-30,2021-08-18
      2021-09-01,2021-09-15
      2021-10-01,2021-10-15
      2021-11-01,2021-11-15
      2021-12-01,2021-12-15
      2021-12-31,2022-01-19"
    `);
  });

  it('should create correct data for leap year', async () => {
    const results = await service.generateSalariesDates(new Date('2020-01-01'));

    expect(results).toMatchInlineSnapshot(`
      "payday,bonus
      2020-01-31,2020-02-19
      2020-02-28,2020-03-18
      2020-04-01,2020-04-15
      2020-05-01,2020-05-15
      2020-06-01,2020-06-15
      2020-07-01,2020-07-15
      2020-07-31,2020-08-19
      2020-09-01,2020-09-15
      2020-10-01,2020-10-15
      2020-10-30,2020-11-18
      2020-12-01,2020-12-15
      2021-01-01,2021-01-15"
    `);
  });

  it('should create correct data starting at leap day', async () => {
    const results = await service.generateSalariesDates(new Date('2020-02-29'));

    expect(results).toMatchInlineSnapshot(`
      "payday,bonus
      2020-02-28,2020-03-18
      2020-04-01,2020-04-15
      2020-05-01,2020-05-15
      2020-06-01,2020-06-15
      2020-07-01,2020-07-15
      2020-07-31,2020-08-19
      2020-09-01,2020-09-15
      2020-10-01,2020-10-15
      2020-10-30,2020-11-18
      2020-12-01,2020-12-15
      2021-01-01,2021-01-15
      2021-02-01,2021-02-15"
    `);
  });
});
