import { Movie } from '../movies/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @ManyToOne(() => Movie, (movie) => movie.directors)
  directors: Movie;
}
