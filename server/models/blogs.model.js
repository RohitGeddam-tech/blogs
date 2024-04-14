import mongoose from "mongoose";

const BlogsSchema = mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: { type: Date, default: new Date() },
  tags: [String],
  category: { type: String, ref: "Category" },
  image: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

export default Blogs;