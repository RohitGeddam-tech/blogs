import express from "express";
import {
  addComment,
  createBlog,
  deleteBlog,
  getBlogDetails,
  getBlogs,
  updateBlog,
} from "../controllers/blogs.js";
import { verify } from "../middleware/verify.js";

const router = express.Router();

router.post("/create-blog", verify, createBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-blogs:id", getBlogDetails);
router.post("/update-blog", verify, updateBlog);
router.post("/delete-blog", verify, deleteBlog);
router.post("/add-comment", verify, addComment);

export default router;
