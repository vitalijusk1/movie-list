import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { paths } from "../router/paths";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCurrentUserAsync } from "../store/slices/AuthSlice/authThunk";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUserAsync()).finally(() => {
      setIsChecking(false);
    });
  }, [dispatch]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

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
