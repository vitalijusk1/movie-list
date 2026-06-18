import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = () => {
  // if no token redirect
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
