const express = require("express");
const isAuth = require("../../middleware/auth");
const { getCadenaValorPage, updateActividades } = require("../../controllers/apiControllers/cadenaControllers");
const router = express.Router();

// HOME PAGE
router.get("/:idVigTec/:idTree", isAuth, getCadenaValorPage);

// Update actividades 
router.put("/actividades/:idVigTec/:idTree/:idObj/update", isAuth, updateActividades);

module.exports = router;