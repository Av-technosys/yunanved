/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui";
import { ProductPagination } from "@/components/pagination";
import ReturnTable from "./ReturnTable";

export default function ReturnClient({ data, total, currentPage }: any) {
  return (
    <Card className="p-6">

      <h2 className="text-lg font-semibold mb-4">
        Return Requests
      </h2>

      <ReturnTable data={data} />

      <ProductPagination
        currentPage={currentPage}
        totalPages={total}
      />

    </Card>
  );
}