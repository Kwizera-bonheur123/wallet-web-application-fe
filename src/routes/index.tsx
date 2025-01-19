import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { DashboardLayout } from "../components/Layouts/DashboardLayout";
import AccountPage from "../components/dashboard/account/AccountPage";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
