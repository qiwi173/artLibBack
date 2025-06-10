import { IsString } from 'class-validator';

export class MuseumDto {
  @IsString()
  museumName: string;

  @IsString()
  museumDescription: string;
}
