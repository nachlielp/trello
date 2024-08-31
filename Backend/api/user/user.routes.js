import express from "express";
import {
  checkUser,
  getUsersArr,
  updateUser,
  userByEmail,
  userById,
  userByUserName,
} from "./user.controller.js";
import { requireAuth } from "../../middlewares/require-auth.middleware.js";

const router = express.Router();
router.put("/", requireAuth, updateUser);
router.post("/checkToken", checkUser);
router.get("/users", getUsersArr);
router.get("/i/:id", userById);
router.get("/e", userByEmail);
router.get("/u/:username",requireAuth, userByUserName);

export const userRouter = router;
