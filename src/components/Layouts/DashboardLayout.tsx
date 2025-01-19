import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "../dashboard/DashboardNavBar";
import { DashboardSlidebar } from "../dashboard/DashboardSlidebar";

export const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <DashboardSlidebar />
        <div className="bg-[#484848]/5 w-full">
          <DashboardNavBar />
          <div className=" mx-12 mt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
