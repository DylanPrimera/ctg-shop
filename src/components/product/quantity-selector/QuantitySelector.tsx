"use client";
import clsx from "clsx";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleQuantity = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };
  return (
    <div className="flex">
      <button
        onClick={() => handleQuantity(-1)}
        disabled={count <= 1}
        className={clsx({ "cursor-not-allowed text-gray-400": count <= 1 })}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button
        onClick={() => handleQuantity(1)}
        disabled={count === 5}
        className={clsx({ "cursor-not-allowed text-gray-400": count === 5 })}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
