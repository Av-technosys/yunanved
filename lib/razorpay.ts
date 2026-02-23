/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    Razorpay: any;
  }
}


export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    // prevent loading twice
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/**
 * Opens Razorpay Checkout
 */export const initiateRazorpayPayment = async ({
  amount,
  name,
  description,
  items,
  userId,
  address,
}: {
  amount: number;
  name: string;
  description: string;
  items: any[];
  userId: string;
  address: any;
}) => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    throw new Error("Razorpay SDK failed to load");
  }

  // 1️⃣ Create Razorpay Order (ONLY amount here)
  const res = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const order = await res.json();

  if (!order?.id) {
    throw new Error("Order creation failed");
  }

  // 2️⃣ Open Razorpay Checkout
  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name,
      description,
      order_id: order.id,

      handler: async function (response: any) {
        try {
          // 3️⃣ Verify + Create DB Order
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              items,
              userId,
              address,
              amount,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            resolve(response);
            
          } else {
            reject("Payment verification failed");
          }
        } catch (err) {
          reject(err);
        }
      },

      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  });
};