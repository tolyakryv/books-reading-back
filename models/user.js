const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { schemaValidation } = require("../helpers");
const bcrypt = require("bcryptjs");

const PASSWORD_REGEXP = /^[a-zA-Z0-9]{6,10}$/;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", schemaValidation);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const userAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().pattern(PASSWORD_REGEXP).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().pattern(PASSWORD_REGEXP).required(),
});


const User = model("user", userSchema);

const schemas = {
  userAddSchema,
  userLoginSchema,
};

module.exports = {
  User,
  schemas,
};