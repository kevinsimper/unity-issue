import { createUser, getUser } from "../models/user";
import bcrypt from "bcrypt";

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
  console.log(match, req.body, user);
  if (match) {
    res.json({ status: "Login successful!" });
  } else {
    res.json({ status: "Login failed!" });
  }
}
