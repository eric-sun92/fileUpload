require("dotenv").config();
const { NotAuthenticatedError } = require("../errors");
const jwt = require("json-web-token");

const authorize = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw NotAuthenticatedError("Invalid Authentication Request");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new NotAuthenticatedError("Invalid Authentication Request");
  }
};

module.exports = authorize;
