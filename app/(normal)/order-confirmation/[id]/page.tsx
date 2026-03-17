import { getOrderDetailsById } from "@/helper";
import OrderClient from "./orderClient";

const Page = async (props:any) => {
   const params = await props.params;
   const orderDetails:any = await getOrderDetailsById(params.id);
  return (
    <>
      <OrderClient orderDetails={orderDetails} />
    </>
  );
}

export default Page;

