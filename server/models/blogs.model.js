import mongoose from "mongoose";

const BlogsSchema = mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: { type: Date, default: new Date() },
  tags: [String],
  category: { type: String, ref: "Category" },
  image: String,
  comments: [
    {
      comment: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      date: { type: Date, default: new Date() },
    },
  ],
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

export default Blogs;