// const { Schema } = require("mongoose");

// goals ? timer goals? timer year? statistic?  userSchema?

// /api/auth - register - login - logout - googleRegister - 
// /api/user - userInfo
// /api/books - addBook - getAll - addResume(id)
// /api/training - addBook - deleteBook
// /api/statistic - addResult - getAll

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: [true, "Email is required"],
//     },
//     password: {
//       type: String,
//       required: [true, "Set password for user"],
//     },
//     token: {
//       type: String,
//       default: "",
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const bookSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title must be exist"],
//     },
//     author: {
//       type: String,
//       required: [true, "Title must be exist"],
//     },
//     publicDate: {
//       type: Number,
//       required: [true, "publicDate must be exist"],
//     },
//     amountPages: {
//       type: Number,
//       required: [true, "amountPage must be exist"],
//     },
//     status: {
//       type: String,
//       enum: ["goingToRead", "readingNow", "alreadyRead"],
//       default: "goingToRead",
//     },
//     rating: {
//       type: Number,
//       enum: [0, 1, 2, 3, 4, 5],
//       default: 0,
//     },
//     resume: {
//       type: String,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const trainingSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title must be exist"],
//     },
//     startDate: {
//       type: Number,
//       required: [true, "startDate must be exist"],
//     },
//     finishDate: {
//       type: Number,
//       required: [true, "finishDate must be exist"],
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const statisticSchema = new Schema(
//   {
//     date: {
//       type: Number,
//       required: [true, "date must be exist"],
//     },
//     amountPages: {
//       type: Number,
//       required: [true, "amountPage must be exist"],
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// module.exports = {
//   userSchema,
//     bookSchema,
//     trainingSchema,
//   statisticSchema
// };


