// rutas del usuario

// importo el middleware authJwt del cual uso 2 funciones
// verifyToken verifica que el token sea válido
// getUserByToken devuelve el usuario de acuerdo al token
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/v0/users/me", [authJwt.verifyToken], authJwt.getUserByToken);
};