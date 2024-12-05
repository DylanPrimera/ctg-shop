"use client";
import { NoData } from "@/components";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Order {
  id: string;
  subTotal: number;
  taxes: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  OrderAddress: { firstName: string; lastName: string } | null;
}

interface Props {
  orders?: Order[];
}

export const OrdersList = ({ orders }: Props) => {
  return (
    <>
      <div className="mb-10">
        {orders?.length !== 0 && (
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right">
              <thead className="bg-gray-200 border-b uppercase">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.OrderAddress?.firstName}{" "}
                      {order.OrderAddress?.lastName}
                    </td>
                    <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {order.itemsInOrder}
                    </td>
                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <IoCardOutline
                        className={clsx({
                          "text-green-800": order.isPaid,
                          "text-red-800": !order.isPaid,
                        })}
                      />
                      <span
                        className={clsx("mx-2", {
                          "text-green-800": order.isPaid,
                          "text-red-800": !order.isPaid,
                        })}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 ">
                      <Link
                        href={`/orders/${order.id}`}
                        className="hover:underline"
                      >
                        Show order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {orders?.length === 0 && (
          <NoData
            title={`There's no orders yet`}
            subtitle="Create or login as user and create an order."
          />
        )}
      </div>
    </>
  );
};
