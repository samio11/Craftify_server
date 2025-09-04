import { Router } from "express";
import { authController } from "./auth.controller";

const routes = Router();

routes.post("/login", authController.credentialLogin);
routes.post("/logout", authController.logout);

export const authRoutes = routes;
