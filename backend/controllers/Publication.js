const publication = require("../models/Publication");
const mongoose = require("mongoose");
const fs = require("fs");

exports.getAllPublication = (req, res, next) => {
    publication
        .find()
        .then((publication) => res.status(200).json(publication))
        .catch((error) => res.status(400).json({ error }));
};

exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    delete publicationObject._id;
    delete publicationObject._userId;
    const newPublication = new Publication({
        ...publicationObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        dislikes: 0,
    });

    newPublication
        .save()
        .then(() => {
            res.status(201).json({ message: "Publication enregistré !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getOnePublication = (req, res, next) => {
    publication
        .findOne({ _id: req.params.id })
        .then((publication) => res.status(200).json(publication))
        .catch((error) => res.status(404).json({ error }));
};

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file
        ? {
              ...JSON.parse(req.body.publication),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    publication
        .updateOne({ _id: req.params.id }, { ...publicationObject })
        .then(() => res.status(200).json({ message: "Publication modifié!" }))
        .catch((error) => res.status(401).json({ error }));
};

exports.deletePublication = (req, res, next) => {
    publication
        .findOne({ _id: req.params.id })
        .then((element) => {
            const filename = element.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                publication
                    .deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({
                            message: "Publication supprimé !",
                        });
                    })
                    .catch((error) => res.status(401).json({ error }));
            });
        })
        .catch((error) => res.status(401).json({ error }));
};

exports.likePublication = (req, res) => {
    // permet de retrouver la sauce exact dans la base de données
    publication
        .findOne({ _id: req.params.id })
        .then((element) => {
            //on supprime les users du array
            const filtreLike = element.usersLiked.filter((user) => {
                return user != req.body.userId;
            });
            const filtreDislike = element.usersDisliked.filter((user) => {
                return user != req.body.userId;
            });

            //On ajoute le like et dislike du user
            if (req.body.like === 1) {
                filtreLike.push(req.body.userId);
            } else if (req.body.like === -1) {
                filtreDislike.push(req.body.userId);
            }

            //Maj de la taille du array user
            element.likes = filtreLike.length;
            element.dislikes = filtreDislike.length;

            //sauvegarder l'élément(like,dislike)
            publication
                .updateOne(
                    { _id: req.params.id },
                    {
                        likes: element.likes,
                        dislikes: element.dislikes,
                        usersLiked: filtreLike,
                        usersDisliked: filtreDislike,
                    }
                )
                .then(() => {
                    res.status(200).json({
                        message: "Like ajouté !",
                    });
                });
        })
        .catch((error) => res.status(401).json({ error }));
};
