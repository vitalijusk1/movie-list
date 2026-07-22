import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { paths } from "../router/paths";
import { useAppSelector } from "../store/hooks";

const MainLayout = () => {
  const currentUser = useAppSelector((state) => state.user.user);

  if (!currentUser) {
    return <Navigate to={paths.login()} replace />;
  }

  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
