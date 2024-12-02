import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
  customClass?: string;
}

export const PayedTag = ({ isPaid, customClass }: Props) => {
  return (
    <>
      <div
        className={clsx(
          `flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 ${
            customClass ?? ""
          }`,
          {
            "bg-red-500": !isPaid,
            "bg-green-700": isPaid,
          }
        )}
      >
        <IoCardOutline size={30} />
        <span className="mx-2">{isPaid ? "Payed" : "Pay pending"}</span>
      </div>
    </>
  );
};
