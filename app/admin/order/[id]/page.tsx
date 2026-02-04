import { db } from "@/lib/db";
import EditOrder from "./editClient";
import { order } from "@/db/orderSchema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: {
    id: any;
  };
}
const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const orderInfo = await db.select().from(order).where(eq(order.id, id));

  return (
    <div>
      <EditOrder orderInfo={orderInfo[0]} />
    </div>
  );
};

export default Page;
