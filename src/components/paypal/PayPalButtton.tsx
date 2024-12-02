"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { Skeleton } from "../ui/skeleton/Skeleton";
import { checkPaypalPayment, setTransactionId } from "@/actions";
import { useToastStore } from "@/store";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButtton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const showToast = useToastStore((state) => state.showToast);
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
    const { ok, message, order } = await setTransactionId(
      orderId,
      transactionId
    );
    if (!ok) {
      showToast(message, "error");
    }
    showToast(message, "success");
    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if(!details) return;

    await checkPaypalPayment(details.id as string);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
