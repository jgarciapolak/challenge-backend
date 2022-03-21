// express permite manejar las peticiones http
const express = require("express");
const cors = require("cors");
// importo la configuración de la base de datos
const dbConfig = require("./app/config/db.config");

const app = express();

// seteo el puerto que escucha el servidor
app.listen(8081, () => {
      console.log(`Servidor escuchando el puerto: 8081`)
});

// configuración CORS
var corsOptions = {
      origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// permite parsear las requests de tipo application/json
app.use(express.json());
// permite parsear las requests de tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// configuración de MongoDB
const db = require("./app/models");
const uri = `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.CLUSTER}/${dbConfig.DB}?retryWrites=true&w=majority`;
db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a MongoDB.");
  })
  .catch(err => {
    console.error("Error de conexión", err);
    process.exit();
  });

  // importo las rutas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);