import type { ValidSize } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ValidSize;
  availableSizes: ValidSize[];
  onSizeChange: (size: ValidSize) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange }: Props) => {
  return (
    <div className="my'5">
      <h3 className="font-bold mb-4"> Available sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 antialiased hover:underline text-lg", {
              "underline": size === selectedSize,
            })}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
