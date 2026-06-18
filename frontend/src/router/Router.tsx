import { Routes, Route, Navigate } from "react-router-dom";

import { paths } from "./paths";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "../pages/AuthPages/RegisterPage/RegisterPage";
import MovieListPage from "../pages/MovieListPage/MovieListPage";
import Layout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import RegisterSuccessPage from "../pages/AuthPages/RegisterSuccessPage/RegisterSuccessPage";

const Router = () => {
  return (
    <Routes>
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
      </Route>
      <Route path="*" element={<Navigate to={paths.login()} />} />
    </Routes>
  );
};

export default Router;
