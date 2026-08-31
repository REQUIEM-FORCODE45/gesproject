const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    postProblem,
    getProblems,
    deleteProblem,
    updateProblem,
} = require("../../controllers/apiControllers/problemsController.js");

// Post problema estadao del arte vigilancia tec
router.post("/register/:idVigTec/:idArtState", isAuth, postProblem);
// Send request GET ALL problems of art state
router.get("/get-all/:idVigTec", isAuth, getProblems);
// Send request DELETE problem of art state
router.delete("/delete/:idVigTec/:idArtState/:idProblem", isAuth, deleteProblem);
// Send request UPDATE problem of art state
router.put("/update/:idVigTec/:idArtState/:idProblem", isAuth, updateProblem);

module.exports = router;