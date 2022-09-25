const handleErrorSchema = (error, _, next) => {
  const { name, code } = error;
  console.log(name);
  console.log(code);
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};
module.exports = handleErrorSchema;
