
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

 
function signUp(req, res) {
  const user = new User();
  
  
  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;
 
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales." });
    } else {
 
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;
 
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}
 
function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;
 
   User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(401).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            console.log(password);
            console.log(userStored.password);
            console.log(check);
            
            res.status(401).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ status: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                user:{
                    name: userStored.name,
                    lastname: userStored.lastname,
                    email: userStored.email,
                    role: userStored.role,
                    active: userStored.active
                },
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              });
            }
          }
        });
      }
    }
  });
}
 
function updateUser(req, res) {
    let userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;
 
    if (userData.password) {
 
        bcrypt.hash(userData.password, saltRounds, function (err, hash) {
            userData.password = hash;
 
 
            User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
                console.log(userData);
                if (err) {
                    res.status(500).send({ message: "Error del servidor." });
                } else {
                    if (!userUpdate) {
                        res
                            .status(404)
                            .send({ message: "No se ha encontrado ningun usuario." });
                    } else {
                        res.status(200).send({ message: "Usuario actualizado correctamente" });
                    }
                }
            });
 
        });
 
    }
}
 
 
  function signUpAdmin(req, res) {
    const user = new User();
  
    const { name, lastname, email, role, password } = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = role;
    user.active = true;
  
  
    if (!password) {
      res.status(500).send({ message: "La contraseña es obligatoria. " });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;
  
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res
                  .status(500)
                  .send({ message: "Error al crear el nuevo usuario." });
              } else {
                // res.status(200).send({ user: userStored });
                res
                  .status(200)
                  .send({ message: "Usuario creado correctamente." });
              }
            }
          });
        }
      });
    }
  }

  module.exports=
  {
    signUp,
    signIn
  };