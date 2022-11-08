const jwt = require("jsonwebtoken");
// require("dotenv").config();
const PRIVATE_KEY = "mynameisbhavinpampaniya";

const authUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
  try {
    // const result = jwt.verify(token, process.env.PRIVATE_KEY);
    const result = jwt.verify(token,PRIVATE_KEY);
    console.log(result.user);
    req.user = result.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
};

module.exports = {authUser}