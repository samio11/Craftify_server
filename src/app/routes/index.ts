import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { productRoutes } from "../modules/product/product.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";

export const rootRouter = Router();

const moduleRoutes = [
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/category",
    element: categoryRoutes,
  },
  {
    path: "/product",
    element: productRoutes,
  },
  {
    path: "/review",
    element: reviewRoutes,
  },
  {
    path: "/cart",
    element: cartRoutes,
  },
  {
    path: "/payment",
    element: paymentRoutes,
  },
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));
