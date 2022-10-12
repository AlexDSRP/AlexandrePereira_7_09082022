const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
            });
            console.log(user);
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log(user);
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    valid
                        ? res.status(200).json({
                              userId: user._id,
                              name: user.name,
                              firstName: user.firstName,

                              token: jwt.sign(
                                  {
                                      userId: user._id,
                                      role: user.roleId,
                                  },
                                  process.env.TOKEN,
                                  { expiresIn: "24h" }
                              ),
                          })
                        : res
                              .status(401)
                              .json({ message: "Mot de passe incorrect" });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
