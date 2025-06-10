import { IsString } from 'class-validator';

export class ExhibitionDto {
  @IsString()
  exhibitionName: string;

  @IsString()
  exhibitionDescription: string;
}
