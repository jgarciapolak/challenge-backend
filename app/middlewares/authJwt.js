// jwt es una librería que permite codificar y decodificar jwt
const jwt = require("jsonwebtoken");
// importo la configuración de autenticación
const config = require("../config/auth.config.js");
// importo el modelo de usuario
const db = require("../models");
const User = db.user;

// función para verificar que el token sea válido
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // si el token es null devuelvo error
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // uso jwt para verificar que el token sea válido
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// función para devolver el usuario de acuerdo al token
getUserByToken = (req, res) => {
  let token = req.headers["x-access-token"];
  // si el token es null devuelvo error
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // uso jwt para verificar que el token sea válido
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    let userId = decoded.id;
    // busco el usuario por el id y lo devuelvo
    User.findOne({_id: userId}).then(function(user){
      console.log(user);
      return res.status(200).send(user);
    });
  });
};

const authJwt = {
  verifyToken,
  getUserByToken
};
module.exports = authJwt;