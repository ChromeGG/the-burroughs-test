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
      Array [
        Object {
          "bonus": 2021-02-15T00:00:00.000Z,
          "payday": 2021-01-31T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-03-15T00:00:00.000Z,
          "payday": 2021-02-28T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-04-15T00:00:00.000Z,
          "payday": 2021-03-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-05-19T00:00:00.000Z,
          "payday": 2021-04-29T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-06-15T00:00:00.000Z,
          "payday": 2021-05-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-07-15T00:00:00.000Z,
          "payday": 2021-06-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-08-18T00:00:00.000Z,
          "payday": 2021-07-29T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-09-15T00:00:00.000Z,
          "payday": 2021-08-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-10-15T00:00:00.000Z,
          "payday": 2021-09-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2021-11-15T00:00:00.000Z,
          "payday": 2021-10-31T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-12-15T00:00:00.000Z,
          "payday": 2021-11-30T23:00:00.000Z,
        },
        Object {
          "bonus": 2022-01-19T00:00:00.000Z,
          "payday": 2021-12-30T23:00:00.000Z,
        },
      ]
    `);
  });

  it('should create correct data for leap year', async () => {
    const results = await service.generateSalariesDates(new Date('2020-01-01'));

    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "bonus": 2020-02-19T00:00:00.000Z,
          "payday": 2020-01-30T23:00:00.000Z,
        },
        Object {
          "bonus": 2020-03-18T00:00:00.000Z,
          "payday": 2020-02-27T23:00:00.000Z,
        },
        Object {
          "bonus": 2020-04-15T00:00:00.000Z,
          "payday": 2020-03-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-05-15T00:00:00.000Z,
          "payday": 2020-04-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-06-15T00:00:00.000Z,
          "payday": 2020-05-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-07-15T00:00:00.000Z,
          "payday": 2020-06-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-08-19T00:00:00.000Z,
          "payday": 2020-07-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-09-15T00:00:00.000Z,
          "payday": 2020-08-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-10-15T00:00:00.000Z,
          "payday": 2020-09-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-11-18T00:00:00.000Z,
          "payday": 2020-10-29T23:00:00.000Z,
        },
        Object {
          "bonus": 2020-12-15T00:00:00.000Z,
          "payday": 2020-11-30T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-01-15T00:00:00.000Z,
          "payday": 2020-12-31T23:00:00.000Z,
        },
      ]
    `);
  });

  it('should create correct data starting at leap day', async () => {
    const results = await service.generateSalariesDates(new Date('2020-02-29'));

    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "bonus": 2020-03-18T00:00:00.000Z,
          "payday": 2020-02-27T23:00:00.000Z,
        },
        Object {
          "bonus": 2020-04-15T00:00:00.000Z,
          "payday": 2020-03-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-05-15T00:00:00.000Z,
          "payday": 2020-04-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-06-15T00:00:00.000Z,
          "payday": 2020-05-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-07-15T00:00:00.000Z,
          "payday": 2020-06-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-08-19T00:00:00.000Z,
          "payday": 2020-07-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-09-15T00:00:00.000Z,
          "payday": 2020-08-31T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-10-15T00:00:00.000Z,
          "payday": 2020-09-30T22:00:00.000Z,
        },
        Object {
          "bonus": 2020-11-18T00:00:00.000Z,
          "payday": 2020-10-29T23:00:00.000Z,
        },
        Object {
          "bonus": 2020-12-15T00:00:00.000Z,
          "payday": 2020-11-30T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-01-15T00:00:00.000Z,
          "payday": 2020-12-31T23:00:00.000Z,
        },
        Object {
          "bonus": 2021-02-15T00:00:00.000Z,
          "payday": 2021-01-31T23:00:00.000Z,
        },
      ]
    `);
  });
});
