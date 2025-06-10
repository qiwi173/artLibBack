import { IsString } from 'class-validator';

export class AwardDto {
  @IsString()
  awardName: string;

  @IsString()
  awardDescription: string;
}
