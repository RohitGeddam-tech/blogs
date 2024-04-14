import mongoose from "mongoose";
import Blogs from "../models/blogs.model.js";
import Comments from "../models/comments.model.js";

// Create New Blog
export const createBlog = async (req, res) => {
  const body = req.body;

  if (!req.userId) return res.status(404).json({ message: "Unauthorized!" });
  const newBody = new Blogs({
    ...body,
    author: req.userId,
    date: new Date().toISOString(),
  });

  try {
    await newBody.save();
    res.status(201).json(body);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  const { category, title } = req.query;

  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (title) {
    filter.title = { $regex: new RegExp(title, "i") }; // Case-insensitive title search
  }

  try {
    const blogs = await Blogs.find(filter)
      .sort({ _id: -1 })
      .populate("author", "name");

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Single Blog
export const getBlogDetails = async (req, res) => {
  const { id } = req.body;

  try {
    const blog = await Blogs.findById(id)
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: {
            path: 'author',
            select: 'name'
          }
      });

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const blog = req.body;

  if (!req.userId) return res.status(404).json({ message: "Unauthorized!" });

  const ifBlog = await Blogs.findById(blog._id);
  if (!ifBlog) return res.status(404).send("Blog not found!");

  const updatedPost = await Blogs.findByIdAndUpdate(
    blog._id,
    { ...blog, date: new Date() },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { id } = req.body;
  // const post = req.body;
  if (!req.userId) return res.status(404).json({ message: "Unauthorized!" });

  const blog = await Blogs.findById(id);
  if (!blog) return res.status(404).send("Blog not found!");

  await Blogs.findByIdAndRemove(id);

  res.status(200).json({ message: "Blog deleted successfully!" });
};

// Add New Comment
export const addComment = async (req, res) => {
  const { data } = req.body;
  //   console.log(comment);

  if (!req.userId) return res.status(404).json({ message: "Unauthorized!" });

  try {
    const blog = await Blogs.findById(data.blog);

    if (!blog) return res.status(404).send("Blog not found!");

    // const commentValue = comment.comment;
    const newComment = new Comments({
      comment: data.comment,
      blog: data.blog,
      author: data.author,
    });
    await newComment.save();

    if (!blog.comments) {
      blog.comments = newComment;
    } else {
      blog.comments.push(newComment);
    }
    
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Comment Added Successfully!",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
