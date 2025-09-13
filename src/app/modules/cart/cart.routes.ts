import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { cartController } from "./cart.controller";

const routes = Router();

routes.post("/create", checkAuth([IRole.customer]), cartController.createCart);
routes.delete(
  "/delete/:cartId",
  checkAuth([IRole.customer]),
  cartController.deleteCart
);

routes.get(
  "/get",
  checkAuth([IRole.customer]),
  cartController.getAllCartForUser
);
routes.get(
  "/get-admin",
  checkAuth([IRole.admin]),
  cartController.getAllCartForAdmin
);

export const cartRoutes = routes;
