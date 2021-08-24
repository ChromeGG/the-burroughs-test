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
      expect(text).toMatchInlineSnapshot(
        `"[{\\"payday\\":\\"2020-02-27T23:00:00.000Z\\",\\"bonus\\":\\"2020-03-18T00:00:00.000Z\\"},{\\"payday\\":\\"2020-03-31T22:00:00.000Z\\",\\"bonus\\":\\"2020-04-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-04-30T22:00:00.000Z\\",\\"bonus\\":\\"2020-05-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-05-31T22:00:00.000Z\\",\\"bonus\\":\\"2020-06-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-06-30T22:00:00.000Z\\",\\"bonus\\":\\"2020-07-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-07-30T22:00:00.000Z\\",\\"bonus\\":\\"2020-08-19T00:00:00.000Z\\"},{\\"payday\\":\\"2020-08-31T22:00:00.000Z\\",\\"bonus\\":\\"2020-09-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-09-30T22:00:00.000Z\\",\\"bonus\\":\\"2020-10-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-10-29T23:00:00.000Z\\",\\"bonus\\":\\"2020-11-18T00:00:00.000Z\\"},{\\"payday\\":\\"2020-11-30T23:00:00.000Z\\",\\"bonus\\":\\"2020-12-15T00:00:00.000Z\\"},{\\"payday\\":\\"2020-12-31T23:00:00.000Z\\",\\"bonus\\":\\"2021-01-15T00:00:00.000Z\\"},{\\"payday\\":\\"2021-01-31T23:00:00.000Z\\",\\"bonus\\":\\"2021-02-15T00:00:00.000Z\\"}]"`,
      );
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
