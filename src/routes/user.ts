import { createUser } from "../models/user";

export async function signUpRoute(req, res) {
  const user = await createUser({
    email: req.body.email,
    password: req.body.password
  });
  res.json({ status: "User was created!" });
}
