import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MoviesService } from './movies.service';
import { MovieDto } from './dtos/movie.dto';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('movies')
@Serialize(MovieDto)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @CurrentUser() user: User) {
    return this.moviesService.create(createMovieDto, user);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}
