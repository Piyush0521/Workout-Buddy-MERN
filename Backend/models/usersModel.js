const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//making our own static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Fill in all the fields!");
  }

  //checking the uniqueness of email
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }
  //email and password validation
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "PASSWORD TOO WEAK!! Password must be at least 8 characters long and must contain at least one lower & upper case alphabet, one number and one special symbol i.e. @,$,& etc."
    );
  }

  //assigning salt
  const salt = await bcrypt.genSalt(10);

  //getting a hashed password as "hash"
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hash });

  return user;
};

//making our own static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fill in all the fields!");
  }
  //verifying the email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email is not registered");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
