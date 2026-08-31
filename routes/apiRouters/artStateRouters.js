const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    postArtState,
    updateArtState,
    updateAllArtState
} = require("../../controllers/apiControllers/artStateController.js");

// Send a post request to register a art state
router.post("/register/:idVigTec", isAuth, postArtState);
// Send a put request to update a component of art state
router.put("/:idVigTec/update/:idArtState", isAuth, updateArtState);
// Send a put request to update art state
router.put("/update/:idVigTec/:idArtState", isAuth, updateAllArtState);

// Module export
module.exports = router;