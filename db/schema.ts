import { coupon, couponTransaction, taileredFit, user } from "./userSchema";
import { product, productAttribute } from "./productSchema";
import { review } from "./reviewSchema";
import { contact, subscription } from "./contactSchema";
import {
  order,
  orderItem,
  orderRelations,
  orderItemRelations,
} from "./orderSchema";

export const productTable = product;
export const productAttributeTable = productAttribute;
export const taileredFits = taileredFit;

export const orderTable = order;
export const orderItemsTable = orderItem;

export const userTable = user;
export const userCoupons = coupon;
export const usercouponTransaction = couponTransaction;

export const reviewsTable = review;

export const contactTable = contact;

// Blogs
// export const blogTable = blog;
// export const blogFormTable = blogForm;

export const subscriptionTable = subscription;

// User order
export const orderRelationsTable = orderRelations;
export const orderItemRelationsTable = orderItemRelations;
