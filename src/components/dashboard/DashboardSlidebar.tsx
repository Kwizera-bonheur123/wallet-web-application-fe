import { FaHome } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { BiSolidBookmark } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { FaSuitcase } from "react-icons/fa6";

export const DashboardSlidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: FaHome },
    { to: "/account", label: "Accounts", icon: IoIosPersonAdd },
    { to: "/transactions", label: "Transactions", icon: FaSuitcase },
    { to: "/budget", label: "Budget", icon: IoPeople },
    { to: "/category", label: "Category", icon: BiSolidBookmark },
  ];
  return (
    <div className=" bg-white h-screen w-[28%] pl-6">
      <div className=" pt-14">
        <div className=" grid gap-7 mt-9">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                ` flex items-center gap-2 text-sm  hover:text-white hover:bg-[#266491] p-3 rounded-l-lg ${
                  isActive ? "bg-[#266491] text-white p-3 rounded-l-lg" : ""
                }`
              }
            >
              <link.icon size="20px" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
