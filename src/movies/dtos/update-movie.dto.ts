import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @IsOptional()
  releaseYear: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  plot: string;
}
