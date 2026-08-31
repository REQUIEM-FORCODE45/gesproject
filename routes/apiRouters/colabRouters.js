const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    changePermissions,
    blockColab,
    unlockColab
} = require("../../controllers/apiControllers/colabController");

// request post changge permission colab
router.post("/:idVigTec/permission", isAuth, changePermissions);

// request put to block colab 
router.put("/:idVigTec/block/:idColab", isAuth, blockColab);

// request put to block colab 
router.put("/:idVigTec/unlock/:idColab", isAuth, unlockColab);

// Module export
module.exports = router;