"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { Skeleton } from "../ui/skeleton/Skeleton";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButtton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = amount.toFixed(2).toString();
  if (isPending)
    return (
      <>
        <div className="flex flex-col gap-4 mb-18">
          <Skeleton customClass="h-11" />
          <Skeleton customClass="h-11" />
        </div>
      </>
    );

  // generate transaction id
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id: new Date().toISOString(),
          amount: {
            value: roundedAmount,
            currency_code: "USD",
          },
        },
      ],
    });
    console.log(transactionId);

    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};
