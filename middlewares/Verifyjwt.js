const { StatusCodes } = require("http-status-codes");
const admin = require("../service");
const Apiresponse = require("../utils/Apiresponse");
const {
  badReqError,
  UnauthrizedError,
  UnauthenticatedError,
} = require("../utils/Customerrors");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthenticatedError("You are not authorized");
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("You are not authorized");
  }
};

module.exports = verifyJWT;
