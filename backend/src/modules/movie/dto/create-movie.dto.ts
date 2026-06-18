export class CreateMovieDto {
  title: string;
  description: string;
  rating: number;
  lengthMinutes: number;
  posterUrl?: string;
  year?: number;
  genreIds: number[];
  relatedMovieIds?: number[];
}
