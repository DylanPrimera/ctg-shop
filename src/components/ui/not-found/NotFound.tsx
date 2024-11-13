import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const NotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">We&apos;re sorry.</p>
        <p className="flex items-center justify-center gap-1 font-light">
          <span>Go</span>
          <Link
            href={"/"}
            className="font-normal hover:underline transition-all"
          >
            Home
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <Image
          src={"/imgs/starman_750x750.png"}
          alt="Starman 404"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
