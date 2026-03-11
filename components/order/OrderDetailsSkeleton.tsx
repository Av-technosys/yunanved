import { Card } from "@/components/ui/card";

export default function OrderDetailsSkeleton() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 animate-pulse">

      <Card className="lg:col-span-5 h-[320px] rounded-[24px] bg-white" />

      <div className="lg:col-span-7 space-y-4">
        <Card className="h-[140px] rounded-[24px] bg-gray-50" />
        <Card className="h-[140px] rounded-[24px] bg-gray-50" />
      </div>

      <Card className="lg:col-span-12 h-[240px] rounded-[24px] bg-gray-50" />

    </div>
  );
}