import { Actor } from '../actors/actor.entity';
import { Director } from '../directors/director.entity';
import { Genre } from '../genres/genre.entity';
import { User } from '../users/user.entity';
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
