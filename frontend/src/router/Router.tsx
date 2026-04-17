import { Routes, Route, Navigate } from "react-router-dom";

import { paths } from "./paths";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "../pages/AuthPages/RegisterPage/RegisterPage";
import MovieListPage from "../pages/MovieListPage/MovieListPage";
import Layout from "../layouts/Layout";
import ProtectedLayout from "../layouts/ProtectedLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.login()} element={<LoginPage />} />
        <Route path={paths.register()} element={<RegisterPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path={paths.movieList()} element={<MovieListPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={paths.login()} />} />
      {/* Basic layout for all screens - Header/Content/BottomNav */}
      {/* <Route element={<Layout />}>
        <Route element={<ProtectedLayout />}> */}
      {/* Protected routes - require authentication */}
      {/* <Route path={paths.dashboard()} element={<DashboardScreen />} />

          <Route
            path={paths.vehicle(":vehicleId")}
            element={<VehicleDetailScreen />}
          />
          <Route path={paths.agreements()} element={<AgreementsScreen />} />
          <Route path={paths.pricing()} element={<PricingScreen />} />
          <Route path={paths.reports()} element={<ReportsScreen />} />
          <Route path={paths.settings()} element={<SettingsScreen />} />
          <Route
            path={paths.browseVehicles()}
            element={<BrowseVehiclesScreen />}
          />
          <Route
            path={paths.leaseNow(":vehicleId")}
            element={<LeaseNowScreen />}
          />
          <Route path={paths.root()} element={<DashboardScreen />} /> */}
      {/* <Route element={<AdminLayout />}> */}
      {/* Admin routes, require admin role to access */}
      {/* <Route path={paths.map()} element={<MapViewScreen />} />
            <Route path={paths.alerts()} element={<AlertsScreen />} />
            <Route
              path={paths.licenseManagement()}
              element={<LicenseManagementScreen />}
            /> */}
      {/* </Route> */}
      {/* </Route> */}
      {/* </Route> */}
    </Routes>
  );
};

export default Router;
