const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');


router.post('/register', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    email: req.body.email,
  });

  try {
    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }

})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!");
    const { password, ...other } = user._doc;
    res.status(200).json(other);

  } catch (err) {
    res.status(500).json(err);

  }
})

module.exports = router;