import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';
  ACCESS_TOKEN_NAME = 'accessToken';

  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);
    if (oldUser)
      throw new BadRequestException('Такой пользователь уже зарегестрирован');

    const { password, ...user } = await this.userService.create(dto);
    const tokens = this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const { password, ...user } = await this.userService.getById(result.id);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  private issueTokens(userId: string, role?: string) {
    const data = { id: userId, role };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  addAccessTokenToResponse(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);

    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const domain = this.configService.get('DOMAIN');

    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      domain: isProduction ? domain : undefined,
      expires: expiresIn,
      secure: isProduction,
      sameSite: 'lax',
    });
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Неверный пароль');

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const domain = this.configService.get('DOMAIN');

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: isProduction ? domain : undefined,
      expires: expiresIn,
      secure: isProduction,
      sameSite: 'lax',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const domain = this.configService.get('DOMAIN');

    res.cookie(this.configService.get('REFRESH_TOKEN_NAME'), '', {
      httpOnly: true,
      domain: isProduction ? domain : undefined,
      expires: new Date(0),
      secure: isProduction,
      sameSite: 'lax',
    });
  }
}
