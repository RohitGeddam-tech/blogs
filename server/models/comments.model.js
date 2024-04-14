import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
  comment: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: { type: Date, default: new Date() },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
});

const Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;
