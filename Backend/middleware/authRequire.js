const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authRequire = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log("****token*****", token);
    console.log("**id** -", id);
    //attaching the user property to the request object
    req.user = await User.findOne({ id });
    console.log("********req.user****", req.user);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = authRequire;
