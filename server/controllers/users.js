import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    // console.log(exist, email)
    if (!exist) return res.status(404).json({ message: "User doen't exist." });

    const confirm = await bcrypt.compare(password, exist.password);
    if (!confirm)
      return res.status(401).json({ message: "Password is incorrect." });

    const token = jwt.sign({ id: exist._id, email: exist.email }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result: exist, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists." });

    const hashPass = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPass,
      name,
    });

    const token = jwt.sign({ id: result._id, email: result.email }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
