import { IsString } from 'class-validator';

export class CommunityDto {
  @IsString()
  communityName: string;

  @IsString()
  communityDescription: string;
}
