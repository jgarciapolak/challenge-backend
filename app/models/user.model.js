const mongoose = require("mongoose");
// Defino el modelo de usuario de la base de datos
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: String,
    avatar: String,
    age: Number,
    email: String,
    name: String,
    surname: String,
    password: { type: String, select: false },
    role: String
  })
);
module.exports = User;