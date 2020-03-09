import { createUser, getUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUpRoute(req, res) {
  const user = await createUser({
    email: req.body.email,
    password: req.body.password
  });
  res.json({ status: "User was created!" });
}

export async function loginRoute(req, res) {
  const user = await getUser(req.body.email);
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    res.json({
      status: "Login successful!",
      token: jwt.sign({ userId: user.id }, "verysecret")
    });
  } else {
    res.json({ status: "Login failed!" });
  }
}
