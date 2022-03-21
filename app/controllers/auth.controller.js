// importo la configuración de autenticación
const config = require("../config/auth.config");
// importo el modelo de usuario
const db = require("../models");
const User = db.user;
// jwt es una librería que permite codificar y decodificar jwt
var jwt = require("jsonwebtoken");
// librería para encriptar y comparar contraseñas
var bcrypt = require("bcryptjs");

// función para loguear un usuario
exports.signin = (req, res) => {
  // busco al usuario por el email y pido que venga con la password incluída
  User.findOne({
    email: req.body.email
  })
    .select('password')
    .exec((err, user) => {
      // si hay error devuelvo el error
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // si no hay usuario devuelvo not found
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // comparo las contraseñas
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // si la contraseña no es válida devuelvo unauthorized
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // si las credenciales son válidas creo el token con una validez de 24 horas y lo devuelvo
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 horas
      });
      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token
      });
    });
};

exports.validEmail = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      console.log(err)
      console.log(user)
      if (err){
        res.status(500).send();
        return;
      }
      if (user) {
        res.status(200).send();
        return;
      }else{
        res.status(404).send();
        return;
      }
    });
};