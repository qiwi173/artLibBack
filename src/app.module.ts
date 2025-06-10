import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { ArtistModule } from './artist/artist.module';
import { ArtModule } from './art/art.module';
import { GenreModule } from './genre/genre.module';
import { MuseumModule } from './museum/museum.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    NewsModule,
    ArtistModule,
    ArtModule,
    GenreModule,
    MuseumModule,
  ],
})
export class AppModule {}
