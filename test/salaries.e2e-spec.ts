import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('SalaryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('GET', () => {
    it('returns correct data', async () => {
      const { statusCode, type, text } = await request(app.getHttpServer()).get(
        '/salaries/2020-02-21',
      );

      expect(statusCode).toEqual(200);
      expect(type).toEqual('text/csv');
      expect(text).toMatchInlineSnapshot(`
        "payday,bonus
        2020-02-28,2020-02-19
        2020-03-31,2020-03-18
        2020-04-30,2020-04-15
        2020-05-29,2020-05-15
        2020-06-30,2020-06-15
        2020-07-31,2020-07-15
        2020-08-31,2020-08-19
        2020-09-30,2020-09-15
        2020-10-30,2020-10-15
        2020-11-30,2020-11-18
        2020-12-31,2020-12-15
        2021-01-29,2021-01-15"
      `);
    });

    it('it validate input format', async () => {
      const { statusCode, text } = await request(app.getHttpServer()).get(
        '/salaries/12-34-56',
      );

      expect(statusCode).toEqual(400);
      expect(text).toEqual(
        '{"statusCode":400,"message":["Please provide date in \\"YYYY-MM-DD\\" format"],"error":"Bad Request"}',
      );
    });

    it('it validate input sens', async () => {
      const { statusCode, text } = await request(app.getHttpServer()).get(
        '/salaries/2021-02-29',
      );

      expect(statusCode).toEqual(400);
      expect(text).toEqual(
        '{"statusCode":400,"message":["Please provide date in \\"YYYY-MM-DD\\" format"],"error":"Bad Request"}',
      );
    });
  });
});
