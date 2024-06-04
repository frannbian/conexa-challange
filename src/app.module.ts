import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/movie.entity';
import { Director } from './directors/director.entity';
import { Actor } from './actors/actor.entity';
import { Genre } from './genres/genre.entity';
import { RolesGuard } from './users/guards/roles.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: 'postgres',
    //   password: 'root',
    //   database: process.env.DB_NAME,
    //   entities: [User, Movie, Director, Actor, Genre],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      entities: [User, Movie, Director, Actor, Genre],
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
