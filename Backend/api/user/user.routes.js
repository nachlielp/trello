import express from "express";
import { checkUser, updateUser, userByEmail, userById } from "./user.controller.js";
import { requireAuth } from "../../middlewares/require-auth.middleware.js";

const router = express.Router();
router.put('/',requireAuth,updateUser)
router.post("/checkToken", checkUser);
router.get("/id/:id", userById);
router.get("/email/:email", userByEmail);

export const userRouter = router;
