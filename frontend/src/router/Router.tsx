import { Routes, Route, Navigate } from "react-router-dom";

import { paths } from "./paths";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "../pages/AuthPages/RegisterPage/RegisterPage";
import MovieListPage from "../pages/MovieListPage/MovieListPage";
import Layout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import RegisterSuccessPage from "../pages/AuthPages/RegisterSuccessPage/RegisterSuccessPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import InvalidPage from "../pages/InvalidPage/InvalidPage";
import { useAppSelector } from "../store/hooks";

const Router = () => {
  const currentUser = useAppSelector((state) => state.user.user);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={currentUser ? paths.movieList() : paths.login()}
            replace
          />
        }
      />
      <Route element={<Layout />}>
        <Route path={paths.login()} element={<LoginPage />} />
        <Route path={paths.register()} element={<RegisterPage />} />
        <Route
          path={paths.registerSuccess()}
          element={<RegisterSuccessPage />}
        />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={paths.movieList()} element={<MovieListPage />} />
        <Route path={paths.movie(":movieId")} element={<MoviePage />} />
      </Route>
      <Route path="*" element={<InvalidPage />} />
    </Routes>
  );
};

export default Router;
