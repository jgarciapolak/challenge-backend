// importo la librería para conectar con MongoDB
// creo un objeto y le asigno mongoose y el modelo del usuario para luego conectarme a la base de datos
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
module.exports = db;