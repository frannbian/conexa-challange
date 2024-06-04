import { Movie } from 'src/movies/movie.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @ManyToOne(() => Movie, (movie) => movie.actors)
  actors: Movie;
}
