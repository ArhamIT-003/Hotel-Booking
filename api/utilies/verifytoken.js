import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    next(); // call the next middleware function
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      next(createError(401, "You are not authenticated!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(401, "You are not admin!"));
    }
  });
};
