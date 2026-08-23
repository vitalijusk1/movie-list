export const paths = {
  movieList: () => "/movie-list" as const,
  movie: (movieId: string) => `/movie/${movieId}` as const,
  register: () => "/register" as const,
  login: () => "/login" as const,
  registerSuccess: () => "/register-success" as const,
  //   vehicle: (vehicleId: string) => `/vehicle/${vehicleId}`,
};
