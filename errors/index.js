const NotFoundError = require("./notFound");
const NotAuthenticatedError = require("./notAuthenticated");
const BadRequestError = require("./badRequest");
const CustomAPIError = require("./customAPIError");

module.exports = {
  NotFoundError,
  NotAuthenticatedError,
  BadRequestError,
  CustomAPIError,
};
