import { Actor } from 'src/actors/actor.entity';
import { Director } from 'src/directors/director.entity';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column()
  rating: number;

  @Column()
  plot: string;

  @ManyToOne(() => User, (user) => user.movies)
  user: User;

  @OneToMany(() => Actor, (movie) => movie.actors)
  actors: Actor[];

  @OneToMany(() => Genre, (movie) => movie.genres)
  genres: Genre[];

  @OneToMany(() => Director, (movie) => movie.directors)
  directors: Director[];
}
