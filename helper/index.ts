// category
export {
  createCategory,
  updateCategory,
  attachProductCategory,
  getCategories,
  getProductCategory,
  updateProductCategory,
  getCategoriesPagination,
  deleteCategory,
} from "./category/action";

// product
export {
  createProduct,
  updateProduct,
  saveProductAttributes,
  getProductAttributes,
  getFullProduct,
  deleteProduct,
  getProducts,
  getProductSimilarProducts,
  getProductsForCart
} from "./product/action";

//order
export {
  fetchOrders,
  fetchOrderDetails,
  updateOrderStatus,
  createOrder,
  getOrdersByUserId,
  getOrderById

} from "./order/action";

export {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon/action";


//reviews
export {toggleApproveReview ,  deleteReview, getReviewStats ,createReview} from "./review/action"

//auth
export { signUp , signIn} from "./authentication/action";

//cart

export {addProductToUserCart , increaseCartItem, decreaseCartItem, removeCartItem} from "./cart/action"


//featured products
export {getFeaturedProducts, deleteFeaturedProduct , addFeaturedProduct} from "./featuredProduct/action"

//featured categories
export {getFeaturedCategories, deleteFeaturedCategory, addFeaturedCategory} from "./featuredCategory/action"
//user

export {getProfile , updateProfile, getAddresses, saveAddress, deleteAddress} from "./user/action"
