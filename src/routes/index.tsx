import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { DashboardLayout } from "../components/Layouts/DashboardLayout";
import Account from "../components/dashboard/account/account";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
