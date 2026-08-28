import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsNumber()
  @IsPositive()
  lengthMinutes!: number;

  @IsOptional()
  @IsString()
  posterUrl?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  genreIds!: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relatedMovieIds?: number[];
}
