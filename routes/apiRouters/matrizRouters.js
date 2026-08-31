const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    getMatrizPage,
    getProblems,
    postValueMatriz,

} = require("../../controllers/apiControllers/matrizController.js");

// Send request to redirec page matriz
router.get("/:idVigTec/:idArtState", isAuth, getMatrizPage);
// Send request to get problems of art state
router.get("/problems/:idVigTec/:idArtState", isAuth, getProblems);
// Send request POST value problem to problem
router.post("/value/:idVigTec/:idArtState", isAuth, postValueMatriz);


// Module export
module.exports = router;