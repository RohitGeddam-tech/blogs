// import mongoose from "mongoose";
import Category from "../models/category.model.js";

// Create
export const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!req.userId) return res.status(404).json({ message: "Unauthorized!" });

  const exist = await Category.findOne({ categoryName });
  if (exist) return res.status(400).json({ message: "Category already exists." });

  const newBody = new Category({ categoryName });

  try {
    await newBody.save();
    res.status(201).json({message:"successfully created"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};