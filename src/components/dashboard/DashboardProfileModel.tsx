import { FaHome } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa";
import { IoIosPersonAdd } from 'react-icons/io';
import { PiSignOutBold } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

export const DashboardProfileModel = () => {
    const links = [
        {to:'/dashboard', label:'Dashboard', icon:FaHome},
        {to:'/messages', label:'Messages', icon:FaEnvelope},
        {to:'/profile', label:'Profile', icon:IoIosPersonAdd},
        {to:'/logout', label:'Log Out', icon:PiSignOutBold},
    
      ];
  return (
    <div className=' flex justify-end'>
    <div className=' py-8 px-5 bg-white rounded-lg shadow-profileModel shadow-blue-200/50 grid gap-3 w-[15%] -mt-3'>
        {
            links.map((link,index) => (
                <NavLink key={index} to={link.to} className="text-sm flex bg-center items-center gap-3  hover:text-blue-700"><link.icon size='15px' className=' text-blue-700 cursor-pointer'/>{link.label}</NavLink>
            ))
        }
    </div>
    </div>
  )
}
