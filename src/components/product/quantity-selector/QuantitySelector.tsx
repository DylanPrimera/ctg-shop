import clsx from "clsx";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  customClass?: string;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  customClass,
}: Props) => {
  return (
    <div className={`flex ${customClass}`}>
      <button
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1}
        className={clsx({ "cursor-not-allowed text-gray-400": quantity <= 1 })}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(+1)}
        disabled={quantity === 5}
        className={clsx({ "cursor-not-allowed text-gray-400": quantity === 5 })}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
