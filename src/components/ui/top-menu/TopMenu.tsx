"use client";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";
import { useCartStore, useUIStore } from "@/store";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Men",
    href: "/gender/men",
  },
  {
    label: "Women",
    href: "/gender/women",
  },
  {
    label: "Kid",
    href: "/gender/kid",
  },
];

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore(
    (state) => state.getSummaryInformation().productsInCart
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="px-5 w-full">
      <div className="flex justify-between items-center xl:w-[1350px] xl:mx-auto">
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
          <Link href={"/cart"}>
            <div className="relative py-2">
              {totalItemsInCart > 0 && loaded && (
                <div className="t-0 absolute -top-1 left-3">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full p-3 text-xs text-white bg-blue-700 fade-in">
                    {totalItemsInCart}
                  </p>
                </div>
              )}
              <IoCartOutline className="h-6 w-6" />
            </div>
            <div className="relative"></div>
          </Link>
          <button
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            onClick={openMenu}
            title="Open side menu"
          >
            <IoMenuOutline className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
