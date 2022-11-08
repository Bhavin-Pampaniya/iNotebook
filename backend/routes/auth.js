// require("dotenv").config();
const PRIVATE_KEY = "mynameisbhavinpampaniya";
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authUser } = require("../middleware/authUser");

router.get("/", (req, res) => {
  res.send("welcome to auth");
});

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require Login
router.post(
  "/createuser",
  [
    body("name", "name should be atleast of 3 character").isLength({ min: 3 }),
    body("email", "please enter a valid email").isEmail(),
    body("password", "length of password should be atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wether email is unique or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .json({ error: "user with this email already exists" });

      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: pass,
      });
      const payload = {
        user: {
          id: user._id,
        },
      };
      // const PRIVATE_KEY = process.env.PRIVATE_KEY;
      // console.log(PRIVATE_KEY);
      const authToken = jwt.sign(payload, PRIVATE_KEY);
      res.json({ authToken });
    } catch (error) {
      res.status(500).send({error:"Internal server error",message:error.message});
    }
  }
);

// ROUTE 2: Logging in a User using: POST "/api/auth/login". Doesn't require login
router.post(
  "/login",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "please enter password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400) 
          .json({ error: "please enter correct credentials" });
      }
      const compPass = await bcrypt.compare(password, user.password);
      if (!compPass) {
        return res
          .status(400)
          .json({ error: "please enter correct credentials" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      // const token = jwt.sign(payload, process.env.PRIVATE_KEY);
      const token = jwt.sign(payload, PRIVATE_KEY);
      // res.json({"success":"welcome you've successfully logged in"})
      res.json({ token });
    } catch (error) {    
      // res.status(500).send("Internal server error");
      res.status(500).send({error:"Internal server error",message:error.message});
   
    }
  }
);

// ROUTE 3: Getting user details using: POST "/api/auth/getuser". requires login
router.post("/getuser", authUser, async (req, res) => {
  const _id = req.user.id;
  try {
    const user = await User.findOne({_id}).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(401).json({ error: "Internal server error", e: error.message });
  }
});
module.exports = router;
