const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

//if it doesn't work, refactor using if elses
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization header must be provided");
  }
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    throw new Error("Authentication token must be Bearer [token]");
  }
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch {
    {
      throw new AuthenticationError("Invalid token");
    }
  }
};
