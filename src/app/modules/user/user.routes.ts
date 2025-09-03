import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { userController } from "./user.controller";

const routes = Router();

routes.post(
  "/create-user",
  multerUpload.single("file"),
  userController.createUser
);

export const userRoutes = routes;
