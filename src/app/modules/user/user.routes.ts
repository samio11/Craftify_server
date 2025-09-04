import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "./user.interface";

const routes = Router();

routes.post(
  "/create-user",
  multerUpload.single("file"),
  userController.createUser
);
routes.get(
  "/get-users",
  checkAuth([...Object.values(IRole)]),
  userController.getAllUser
);
routes.patch(
  "/update-user",
  multerUpload.single("file"),
  checkAuth([...Object.values(IRole)]),
  userController.updateUser
);

export const userRoutes = routes;
