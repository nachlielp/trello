import express from "express";
import { testController } from "./test.controller.js";

const router = express.Router();

router.get("/", testController.getTest);

export const testRouter = router;
