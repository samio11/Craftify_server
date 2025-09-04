import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { productController } from "./product.controller";

const routes = Router();

routes.post(
  "/create",
  checkAuth([IRole.admin, IRole.seller]),
  multerUpload.array("files"),
  productController.createProduct
);
routes.get("/get", productController.getAllProduct);

export const productRoutes = routes;
