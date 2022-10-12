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
    const newPublication = new publication({
        commentaire: req.body.commentaire,
        userId: req.auth.userId,
        image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        usersLiked: [],
        date: new Date(),
        name: req.body.name,
        firstName: req.body.firstName,
    });

    newPublication
        .save()
        .then((publication) => {
            res.status(201).json({ publication });
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
    if (req.auth.role == 2 || req.auth.userId == req.body.userId) {
        // const publicationObject = req.file
        //     ? {
        //           ...JSON.parse(req.body.publication),
        //           imageUrl: `${req.protocol}://${req.get("host")}/images/${
        //               req.file.filename
        //           }`,
        //       }
        //     : { ...req.body };
        publication
            .updateOne(
                { _id: req.params.id },
                { commentaire: req.body.commentaire }
            )
            .then(() =>
                res.status(200).json({ message: "Publication modifié!" })
            )
            .catch((error) => res.status(401).json({ error }));
    } else {
        return res
            .status(401)
            .json({ message: "Vous n'avez pas la permission" });
    }
};

exports.deletePublication = (req, res, next) => {
    if (req.auth.role == 2 || req.auth.userId == req.body.userId) {
        publication
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "post deleted" }))
            .catch((error) => console.log(error));
    } else {
        return res
            .status(401)
            .json({ message: "Vous n'avez pas la permission" });
    }
};

exports.likePublication = (req, res) => {
    console.log(req.body);

    // permet de retrouver la sauce exact dans la base de données
    // publication
    //     .findOne({ _id: req.params.id })
    //     .then((element) => {
    //         //on supprime les users du array
    //         const filtreLike = element.usersLiked.filter((user) => {
    //             return user != req.body.userId;
    //         });

    //         //On ajoute le like et dislike du user
    //         if (req.body.like === 1) {
    //             filtreLike.push(req.body.userId);
    //         } else if (req.body.like === 0) {
    //             filtreDislike.push(req.body.userId);
    //         }

    //         //Maj de la taille du array user
    //         element.likes = filtreLike.length;
    //         element.dislikes = filtreDislike.length;

    //         //sauvegarder l'élément(like,dislike)
    //         publication
    //             .updateOne(
    //                 { _id: req.params.id },
    //                 {
    //                     likes: element.likes,
    //                     dislikes: element.dislikes,
    //                     usersLiked: filtreLike,
    //                     usersDisliked: filtreDislike,
    //                 }
    //             )
    //             .then(() => {
    //                 res.status(200).json({
    //                     message: "Like ajouté !",
    //                 });
    //             });
    //     })
    //     .catch((error) => res.status(401).json({ error }));
};
