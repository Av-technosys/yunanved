import { cart, cartItem, coupon, couponTransaction, newsletter, user, userAddress } from "./userSchema";
import { category, featuredBanner, featuredItems, product, productAttribute, productCategory, productMedia } from "./productSchema";
import { review, reviewMedia } from "./reviewSchema";
import { contact, subscription } from "./contactSchema";
import {
  order,
  orderItem,
  payment,
} from "./orderSchema";

export const productTable = product;
export const productAttributeTable = productAttribute;
export const categoryTable = category
export const productCategoryTable = productCategory
export const productMediaTable = productMedia
export const featuredItemsTable = featuredItems
export const featuredBannerTable = featuredBanner

export const reviewsTable = review;
export const reviewMediaTable = reviewMedia

export const orderTable = order;
export const orderItemsTable = orderItem;
export const paymentTable = payment;

export const userTable = user;
export const userCoupons = coupon;
export const usercouponTransaction = couponTransaction;
export const userCart = cart;
export const userCartItems = cartItem;
export const userAddressTable = userAddress;
export const newsletterTable = newsletter;


export const contactTable = contact;

// Blogs
// export const blogTable = blog;
// export const blogFormTable = blogForm;

export const subscriptionTable = subscription;

// User order
// export const orderRelationsTable = orderRelations;
// export const orderItemRelationsTable = orderItemRelations;
