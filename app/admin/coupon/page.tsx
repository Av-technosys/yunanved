import { getCoupons } from "@/helper";
import CouponClient from "./couponClient";

const Page = async ({ searchParams }: any) => {
   const params =  await searchParams;
   const search = params.search ?? "";
  const coupons = await getCoupons(search);

  return (
    <>
      <CouponClient coupons={coupons} />
    </>
  );
};

export default Page;
