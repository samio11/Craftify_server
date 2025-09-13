import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { reviewControllers } from "./review.controller";

const routes = Router();

routes.post(
  "/create",
  checkAuth([IRole.customer]),
  reviewControllers.createReview
);

routes.get(
  "/get",
  
  reviewControllers.getAllReview
);
routes.patch(
  "/update/:id",
  checkAuth([IRole.admin, IRole.customer]),
  reviewControllers.updateReview
);
routes.delete(
  "/delete/:id",
  checkAuth([IRole.admin, IRole.customer]),
  reviewControllers.deleteReview
);

export const reviewRoutes = routes;
