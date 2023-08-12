const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//@doc Login a user
//@route POST /api/users/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
  const username = "Test";
  const Login_id = "test@sunbasedata.com";
  const Passoword = "Test@123";
  const hashedPassword = await bcrypt.hash(Passoword, 10);
  const userAvailabel = await User.findOne({ login_id: Login_id });
  if (!userAvailabel) {
    await User.create({
      username: username,
      login_id: Login_id,
      password: hashedPassword,
    });
  }

  const { login_id, password } = req.body;
  if (!login_id || !password) {
    res.status(400);
    throw new Error("All Fields are mandetory");
  }
  const user = await User.findOne({ login_id: login_id });
  //compare user password and hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.login_id,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("email or passoword is not valid");
  }
});

module.exports = { userLogin };
