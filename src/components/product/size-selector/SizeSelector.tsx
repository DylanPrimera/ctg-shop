"use client";
import type { ValidSize } from "@/interfaces";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  selectedSize: ValidSize;
  availableSizes: ValidSize[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  const [currentSize, setCurrentSize] = useState(selectedSize);
  return (
    <div className="my'5">
      <h3 className="font-bold mb-4"> Available sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              "underline": size === currentSize,
            })}
            onClick={() => setCurrentSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
