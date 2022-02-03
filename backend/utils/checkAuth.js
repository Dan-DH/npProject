const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

//if it doesn't work, refactor using if elses
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization header must be provided");
    console.log("1");
  }
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    throw new Error("Authentication token must be Bearer [token]");
    console.log("2");
  }
  try {
    const user = jwt.verify(token, secret);
    console.log("4");
    return user;
  } catch {
    {
      throw new AuthenticationError("Invalid token");
      console.log("3");
    }
  }
};
