import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { paths } from "../router/paths";

const AuthLayout = () => {
  const currentUser = useAppSelector((state) => state.user.user);

  if (currentUser) {
    return <Navigate to={paths.movieList()} replace />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
