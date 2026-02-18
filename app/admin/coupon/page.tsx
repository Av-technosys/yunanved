import { getCoupons } from "@/helper";
import CouponClient from "./couponClient";

const Page = async () => {
  const coupons = await getCoupons();

  return (
    <>
      <CouponClient coupons={coupons} />
    </>
  );
};

export default Page;
