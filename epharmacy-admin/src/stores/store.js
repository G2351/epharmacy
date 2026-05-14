import { configureStore } from "@reduxjs/toolkit";
import {
  authApiReducer,
  authApiMiddleware,
  authApiReducerPath,
} from "./slices/api/auth.slice.api";
import {
  productApiReducer,
  productApiMiddleware,
  productApiReducerPath,
} from "./slices/api/product.slice.api";
import {
  articleApiReducer,
  articleApiMiddleware,
  articleApiReducerPath,
} from "./slices/api/article.slice.api";
import {
  cartApiReducer,
  cartApiMiddleware,
  cartApiReducerPath,
} from "./slices/api/cart.slice.api";
import {
  userApiReducer,
  userApiMiddleware,
  userApiReducerPath,
} from "./slices/api/user.slice.api";
import {
  uploadApiReducer,
  uploadApiReducerPath,
  uploadApiMiddleware,
} from "./slices/api/upload.slice.api";
import {
  categoryMedicineApiReducer,
  categoryMedicineApiReducerPath,
  categoryMedicineApiMiddleware,
} from "./slices/api/category-medicine.slice.api";
import {
  branchApiReducer,
  branchApiReducerPath,
  branchApiMiddleware,
} from "./slices/api/branch.slice.api";
import {
  voucherApiReducer,
  voucherApiReducerPath,
  voucherApiMiddleware,
} from "./slices/api/voucher.slice.api";

export const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [uploadApiReducerPath]: uploadApiReducer,
    [productApiReducerPath]: productApiReducer,
    [articleApiReducerPath]: articleApiReducer,
    [cartApiReducerPath]: cartApiReducer,
    [userApiReducerPath]: userApiReducer,
    [categoryMedicineApiReducerPath]: categoryMedicineApiReducer,
    [branchApiReducerPath]: branchApiReducer,
    [voucherApiReducerPath]: voucherApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(uploadApiMiddleware)
      .concat(productApiMiddleware)
      .concat(cartApiMiddleware)
      .concat(articleApiMiddleware)
      .concat(userApiMiddleware)
      .concat(categoryMedicineApiMiddleware)
      .concat(branchApiMiddleware)
      .concat(voucherApiMiddleware),
});