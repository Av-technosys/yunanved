import { ORDER_STATUS } from "@/const";
import { pgEnum } from "drizzle-orm/pg-core";


export const cancelRequestStatusEnum = pgEnum("cancel_request_status", [
  "pending",
  "approved",
  "rejected",
  "refunded",
]);

export const returnRequestStatusEnum = pgEnum("return_request_status", [
  "pending",
  "approved",
  "rejected",
  "refunded",
]);

export const orderStatusEnum = pgEnum("order_status", Object.values(ORDER_STATUS) as [string, ...string[]]);