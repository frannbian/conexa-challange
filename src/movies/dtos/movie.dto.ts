import { Expose } from 'class-transformer';
import { Actor } from 'src/actors/actor.entity';
import { Director } from 'src/directors/director.entity';
import { Genre } from 'src/genres/genre.entity';
import { User } from 'src/users/user.entity';

export class MovieDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  releaseYear: string;

  @Expose()
  rating: number;

  @Expose()
  plot: string;

  @Expose()
  user: User;

  @Expose()
  actors: Actor[];

  @Expose()
  genres: Genre[];

  @Expose()
  directors: Director[];
}
