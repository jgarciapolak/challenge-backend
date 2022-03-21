// rutas de autenticación

// importo el controller de autenticación, el cual tiene las funciones para el login y para validar el email
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/validEmail", controller.validEmail);
};