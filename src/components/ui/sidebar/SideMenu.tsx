"use client";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuOptions = [
  {
    title: "Profile",
    icon: <IoPersonOutline size={20} />,
    href: "/profile",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={20} />,
    href: "/orders",
  },
  {
    title: "LogIn",
    icon: <IoLogInOutline size={20} />,
    href: "/auth/login",
  },
  {
    title: "Exit",
    icon: <IoLogOutOutline size={20} />,
    href: "",
  },
];

const administrationOptions = [
  {
    title: "Products",
    icon: <IoShirtOutline size={20} />,
    href: "/profile",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={20} />,
    href: "/profile",
  },
  {
    title: "Users",
    icon: <IoPeopleOutline size={20} />,
    href: "/profile",
  },
]

export const SideMenu = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />

      <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
      <aside>
        <nav className="fixed p-5 right-0 top-0 w-[21rem] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
          <IoCloseOutline
            size={45}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => console.log("clicked")}
          />

          <div className="relative mt-14">
            <IoSearchOutline size={20} className="absolute top-2 left-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 pl-10 py-1 pr-10 rounded border-b-2  border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          {menuOptions.map((option) => (
            <SidebarMenuItem key={option.title} {...option} />
          ))}
          <hr className="w-full h-px bg-gray-200 my-10"/>
          {administrationOptions.map((option) => (
            <SidebarMenuItem key={option.title} {...option} />
          ))}
        </nav>
      </aside>
    </div>
  );
};
