import { FaChevronLeft } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import Profile from "../../assets/profile.jpg";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { DashboardProfileModel } from "./DashboardProfileModel";

export const DashboardNavBar = () => {
  const [profileModel, setProfileModel] = useState(false);
  return (
    <div className=" h-20 bg-white w-full px-8 border-b-2 z-50">
      <div className=" flex justify-between items-center h-full">
        <FaChevronLeft className=" cursor-pointer" size="22px" />
        <div>
          <div className=" flex justify-center items-end gap-3">
            <div className=" flex cursor-pointer">
              <SlEnvolope size="22px" />
              <div className=" bg-blue-700 text-white px-[5px] py-[2px] -mt-3 -ml-1 h-fit rounded-full text-xs">
                4
              </div>
            </div>
            <div className=" flex cursor-pointer">
              <IoMdNotificationsOutline size="24px" />
              <div className=" bg-blue-700 text-white px-[5px] py-[2px] -mt-3 -ml-2 h-fit rounded-full text-xs">
                8
              </div>
            </div>
            <div
              onClick={() => setProfileModel(!profileModel)}
              className=" flex justify-center items-center gap-3 cursor-pointer"
            >
              <img src={Profile} className=" h-10 w-10 rounded-full" />
              <div className=" flex justify-center items-center gap-1">
                <p className=" text-md">Nikola Tesla</p>
                <FaAngleDown className=" text-blue-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {profileModel && <DashboardProfileModel />}
    </div>
  );
};
