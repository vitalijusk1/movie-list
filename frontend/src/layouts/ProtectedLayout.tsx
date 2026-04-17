import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const ProtectedLayout = () => {
  // if no token redirect
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default ProtectedLayout;
