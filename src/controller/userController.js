const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const regisTration = async (req, res) => {
  const newUser = new User({
    username: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.Secret),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.userName,
    });
    if (!user) return res.status(500).json("Wrong Credentials!");
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.Secret
    );
    const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (OriginalPassword !== req.body.password)
      return res.status(500).json("Wrong Credentials!");
    const { password, ...others } = user._doc;
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.Secret,
      { expiresIn: "3d" }
    );
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  regisTration,
  login,
};
