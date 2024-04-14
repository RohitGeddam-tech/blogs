import express from "express";
import {
    createBlog,
    getBlogs
} from "../controllers/blogs.js";
import { verify } from "../middleware/verify.js";

const router = express.Router();

router.post("/create-blog", verify, createBlog);
router.get("/get-blogs", verify, getBlogs);
// router.post("/signup", signup);

export default router;