'use client'
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React, { useEffect } from "react";
import { NavItem } from "./NavItem";
import { IoSearchOutline, IoCartOutline, IoMenuOutline } from "react-icons/io5";
import { useUIStore } from "@/store";

const navItems = [
  {
    label: "Men",
    href: "/category/men",
  },
  {
    label: "Women",
    href: "/category/women",
  },
  {
    label: "Kid",
    href: "/category/kid",
  },
];

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const navBar = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (navBar.current) {
        if (window.scrollY > 0) {
          navBar.current.classList.add("fixed");
          navBar.current.classList.add("top-0");
          navBar.current.classList.add("bg-white");
          navBar.current.classList.add("z-10");
          navBar.current.classList.add("shadow-md");
          navBar.current.classList.add("transition-all");
        } else {
          navBar.current.classList.remove("fixed");
          navBar.current.classList.remove("top-0");
          navBar.current.classList.remove("bg-white");
          navBar.current.classList.remove("z-5");
          navBar.current.classList.remove("shadow-md");
          navBar.current.classList.remove("transition-all");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav id="NavBar" ref={navBar} className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href={"/"}>
          <span
            className={`${titleFont.className} antialiased font-bold tracking-widest`}
          >
            CTG
          </span>
          <span className="antialiased">| Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link href={"/search"}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={"/cart"}>
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" onClick={openMenu} title="Open side menu">
            <IoMenuOutline className="w-5 h-5"/>
        </button>
      </div>
    </nav>
  );
};
