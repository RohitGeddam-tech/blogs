import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model("Users", UsersSchema);

export default Users;
