export const apiRoutes = {
  register: () => "/auth/register",
  login: () => "/auth/login",
  logout: () => "/auth/logout",
  me: () => "/auth/me",
  movies: (params?: string) => `/movies${params}`,
  movie: (movieId: string) => `/movies/${movieId}`,
  genres: () => "/genres",
};
