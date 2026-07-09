export const apiRoutes = {
  register: () => "/auth/register",
  login: () => "/auth/login",
  logout: () => "/auth/logout",
  movies: (params?: string) => `/movies${params}`,
  genres: () => "/genres",
};
