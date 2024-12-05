"use client";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const numberOfPages = generatePaginationNumbers(currentPage, totalPages);

  if (currentPage < 1 || isNaN(currentPage)) {
    redirect(pathname);
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathname}`; // href currentPath redirect
    }

    if (Number(pageNumber) > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center items-center mt-12 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-center gap-1 list-style-none">
          {currentPage > 1 && (
            <li className="page-item">
              <Link
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:text-gray-800  focus:shadow-none"
                href={createPageUrl(currentPage - 1)}
              >
                <IoChevronBackOutline size={20} />
              </Link>
            </li>
          )}
          {numberOfPages?.map((page, index) => (
            <li
              key={index}
              className={clsx("page-item", {
                active: currentPage === page,
              })}
            >
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 text-gray-800 hover:text-gray-800  focus:shadow-none",
                  {
                    "bg-blue-600 hover:bg-blue-600 text-white hover:text-white":
                      currentPage === page,
                    "bg-transparent hover:bg-gray-200": currentPage !== page,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <Link
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800  focus:shadow-none"
                href={createPageUrl(currentPage + 1)}
              >
                <IoChevronForwardOutline size={20} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
