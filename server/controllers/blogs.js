import mongoose from "mongoose";
import Blogs from "../models/blogs.model.js";

// Create
export const createBlog = async (req, res) => {
  const body = req.body;

  console.log(body);

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

// Get
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate('author', 'name').populate('comments.author', 'name');

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
