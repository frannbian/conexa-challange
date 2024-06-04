import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(movieDto: CreateMovieDto, user: User) {
    const movie = this.movieRepository.create(movieDto);

    return this.movieRepository.save(movie);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return movie;
  }

  findAll() {
    return this.movieRepository.find();
  }

  async update(id: number, attrs: Partial<Movie>) {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException('movie not found');
    }
    Object.assign(movie, attrs);
    return this.movieRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException('movie not found');
    }
    return this.movieRepository.remove(movie);
  }
}
