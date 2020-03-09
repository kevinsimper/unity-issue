import jwt from "jsonwebtoken";
import { getUserById } from "./models/user";

export async function Context({ req, res }) {
  const token = (req.headers.authorization || "").replace("bearer ", "");
  try {
    const decoded = jwt.verify(token, "verysecret");
    const user = await getUserById(decoded.userId);
    return {
      user
    };
  } catch (err) {
    throw new Error("Invalid token!");
  }
}
