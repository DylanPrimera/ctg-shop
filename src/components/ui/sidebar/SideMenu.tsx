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
import { useUIStore } from "@/store";
import clsx from "clsx";
import { Logout } from "@/actions";

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const USER_OPTIONS = [
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
];

const ADMIN_OPTIONS = [
  {
    title: "Products",
    icon: <IoShirtOutline size={20} />,
    href: "/",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={20} />,
    href: "/orders",
  },
  {
    title: "Users",
    icon: <IoPeopleOutline size={20} />,
    href: "/users",
  },
];

export const SideMenu = ({ isAuthenticated = false, isAdmin }: Props) => {
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  const handleClick = (clicked: boolean) => {
    if (clicked) {
      closeSideMenu();
    }
  };

  const handleSignOut = async (clicked: boolean) => {
    if (!clicked) return null;
    closeSideMenu();
    Logout();
  };

  return (
    <div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-30 transition-all" />
      )}
      {isMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm transition-all"
          onClick={closeSideMenu}
        />
      )}

      <aside>
        <nav
          className={clsx(
            "fixed p-5 right-0 top-0 w-[21rem] h-screen bg-white z-50 shadow-2xl transform transition-all duration-200",
            {
              "translate-x-full": !isMenuOpen,
            }
          )}
        >
          <IoCloseOutline
            size={45}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={closeSideMenu}
          />

          <div className="relative mt-14">
            <IoSearchOutline size={20} className="absolute top-2 left-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 pl-10 py-1 pr-10 rounded border-b-2  border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          {isAuthenticated &&
            !isAdmin &&
            USER_OPTIONS.map((option) => (
              <SidebarMenuItem
                key={option.title}
                {...option}
                onChangeClick={(clicked) => handleClick(clicked)}
              />
            ))}

          {isAuthenticated &&
            isAdmin &&
            ADMIN_OPTIONS.map((option) => (
              <SidebarMenuItem
                key={option.title}
                {...option}
                onChangeClick={(clicked) => handleClick(clicked)}
              />
            ))}

          {isAuthenticated ? (
            <>
              <hr className="w-full h-px bg-gray-200 mt-5 mb-6" />
              <SidebarMenuItem
                title="Logout"
                icon={<IoLogOutOutline size={20} />}
                href="/auth"
                onChangeClick={handleSignOut}
              />
            </>
          ) : (
            <SidebarMenuItem
              title="Login"
              icon={<IoLogInOutline size={20} />}
              href="/auth"
              onChangeClick={(clicked) => handleClick(clicked)}
            />
          )}
        </nav>
      </aside>
    </div>
  );
};
