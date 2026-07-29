export class GetMoviesQueryDto {
  genreIds?: string;
  search?: string;
  minRating?: string;
  maxRating?: string;
  page?: string;
  perPage?: string;
}
