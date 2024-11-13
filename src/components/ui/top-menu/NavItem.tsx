import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  href: string;
}

export const NavItem = ({ label, href }: Props) => {
  return (
    <Link
      href={href}
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
    >
      {label}
    </Link>
  );
};
