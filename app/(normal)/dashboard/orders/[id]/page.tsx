import { OrderDetailsPage } from "@/components/dashboard/OrderDetails";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <OrderDetailsPage orderId={id} />;
}