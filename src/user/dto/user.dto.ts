import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'generated/prisma';

export class UserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  @MinLength(6, {
    message: 'Пароль не должен быть короче 6 символов',
  })
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @Transform(({value})=> ''+value.toLowerCase())
  user_role?: UserRole

  @IsOptional()
  @IsBoolean()
  subscription?: boolean;
}

