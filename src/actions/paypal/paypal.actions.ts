"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const checkPaypalPayment = async (paypalTransactionId: string) => {
  try {
    const authToken = await getPaypalBearerToken();
    console.log({ authToken });
    if (!authToken) {
      return {
        ok: false,
        message: "Unable to get auht token",
      };
    }
    const resp = await verifyPaypalPayment(paypalTransactionId, authToken);
    if (!resp) {
      return {
        ok: false,
        message: "Error verifying payment",
      };
    }

    const { status, purchase_units } = resp;
    const { invoice_id: orderId } = purchase_units[0];
    if (status !== "COMPLETED") {
      return {
        ok: false,
        message: "Payment not completed",
      };
    }
    try {
    await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          paidAt: new Date(),
        },
      });

      revalidatePath(`/orders/${orderId}`);
      return {
        ok: true,
        message: "Payment completed",
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error trying to update the payment",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(`${process.env.PAYPAL_OAUTH_URL}`, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  transactionId: string,
  authToken: string
): Promise<PaypalOrderStatusResponse | undefined> => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        ...requestOptions,
        cache: "no-store",
      }
    ).then((r) => r.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};
