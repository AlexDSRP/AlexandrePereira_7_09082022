const express = require("express");
const router = express.Router();

const publicationCtrl = require("../controllers/Publication");
const midAuth = require("../middleware/auth");
const midMulter = require("../middleware/multer");

router.get("/publication", midAuth, publicationCtrl.getAllPublication);
router.get("/publication/:id", midAuth, publicationCtrl.getOnePublication);
router.post(
    "/publication",
    midAuth,
    midMulter,
    publicationCtrl.createPublication
);
router.put(
    "/publication/:id",
    midAuth,
    midMulter,
    publicationCtrl.modifyPublication
);
router.delete("/publication/:id", midAuth, publicationCtrl.deletePublication);
router.post("/publication/:id/like", midAuth, publicationCtrl.likePublication);

module.exports = router;
