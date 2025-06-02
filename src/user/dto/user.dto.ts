import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  role?: string;

  @IsOptional()
  @IsBoolean()
  subscription?: boolean;
}

