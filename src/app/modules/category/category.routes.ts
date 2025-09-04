import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { categoryController } from "./category.controller";

const routes = Router();

routes.post(
  "/create",
  checkAuth([IRole.admin]),
  multerUpload.single("file"),
  categoryController.createCategory
);
routes.patch(
  "/update/:id",
  checkAuth([IRole.admin]),
  multerUpload.single("file"),
  categoryController.updateCategory
);

routes.get("/get", categoryController.getAllCategory);

routes.delete(
  "/delete/:id",
  checkAuth([IRole.admin]),
  categoryController.deleteACategory
);

export const categoryRoutes = routes;
