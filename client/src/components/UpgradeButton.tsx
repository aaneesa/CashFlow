// src/components/UpgradeButton.tsx

import api from "../lib/api.js";
import toast from "react-hot-toast";
import { useUser } from "../context/useUser.ts";

interface UpgradeButtonProps {
  userId: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void | Promise<void>;
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ userId }) => {
  const { fetchUser } = useUser();

  const handleUpgrade = async (): Promise<void> => {
    try {
      const { data } = await api.post("/payment/create-order", { amount: 499 });
      const { id: orderId, amount, currency } = data.order;

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
        amount,
        currency,
        name: "Fynsd",
        description: "Unlock Premium Access & Advanced Learning",
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              userId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              toast.success("Premium unlocked successfully!");
              await fetchUser();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Error verifying payment");
          }
        },
        theme: { color: "#00FF7C" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Unable to initiate payment");
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Upgrade to Premium
    </button>
  );
};

export default UpgradeButton;
