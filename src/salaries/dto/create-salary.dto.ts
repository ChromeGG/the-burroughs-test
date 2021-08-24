import { IsOnlyDate } from '../../validators/customValidators';

export class StartDateDto {
  @IsOnlyDate()
  readonly startDate: Date;
}
