import { apiKey, permission } from "@/auth/checkAuth";
import { accessRouter } from "@/routes/access";
import express from "express";

const router = express.Router();

//Check api key
router.use(apiKey);

//Check permission
router.use(permission("0000"));

router.use("/v1/api", accessRouter);

export default router;
