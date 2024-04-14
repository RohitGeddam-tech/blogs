import express from "express";
import { verify } from "../middleware/verify.js";
import { createCategory, getCategories } from "../controllers/category.js";

const router = express.Router();

router.post("/create-category", verify, createCategory);
router.get("/get-categories", verify, getCategories);
// router.post("/signup", signup);

export default router;