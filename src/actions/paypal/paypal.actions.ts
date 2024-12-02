"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";

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
    await verifyPaypalPayment(paypalTransactionId, authToken);
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
    const result = await fetch(
      `${process.env.PAYPAL_OAUTH_URL}`,
      requestOptions
    ).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  transactionId: string,
  authToken: string
): Promise<PaypalOrderStatusResponse> => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      requestOptions
    ).then((r) => r.json());
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
};
