import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  releaseYear: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  plot: string;
}
