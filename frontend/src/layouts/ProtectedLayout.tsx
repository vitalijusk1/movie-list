import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const ProtectedLayout = () => {
  // if no token redirect
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
