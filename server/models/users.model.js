import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "Client" },
});

const Users = mongoose.model("Users", UsersSchema);

export default Users;
