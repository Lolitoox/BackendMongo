import jwt from "jsonwebtoken";
import envs from "../config/env.config.js"

// Creación del token
export const createToken = (user) => {
  const { _id, email, role } = user;
  const token = jwt.sign({ _id, email, role }, envs.CODE_SECRET, { expiresIn: "1m" });
  return token;
};

// Verificación del token
export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, envs.CODE_SECRET);
    return decode;
  } catch (error) {
    return null;
  }
};