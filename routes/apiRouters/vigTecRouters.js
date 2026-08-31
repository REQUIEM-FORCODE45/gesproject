const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    postVigTec,
    getAllVigTec,
    getVigTecByUser,
    getVigTecPage,
    updateVigTec,
    getVigTec,
    deleteVigTec,
    postAddColab
} = require("../../controllers/apiControllers/vigTecController");

const {
    postReferent,
    updateReferent,
    deleteReferent
} = require("../../controllers/apiControllers/referentController");

const multer  = require('multer')
const storage = require('../../utils/file')
let storageFile = storage.fileStorage
const upload = multer({ storage: storageFile })

// Send a post request to register a new vig tec
router.post("/register", isAuth, postVigTec);
// request all vig tec created by user id
router.get("/getAllVigTec", isAuth, getAllVigTec);
// request all vig tec created by user id
router.get("/getVigTecByUser", isAuth, getVigTecByUser);
// page description ficha vig tec
router.get("/:idVigTec", isAuth, getVigTecPage);
// Request update data vig tec by id
router.put("/update/:idVigTec", isAuth, updateVigTec)
// Send request to delete vig tec by id
router.delete("/delete/:idVigTec", isAuth, deleteVigTec);
// request referents of Vig Tec by ID
router.get("/referents/:idVigTec", isAuth, getVigTec);
// Send a post request to register a new referent of a vig tec
router.post("/register-referent/:idVigTec", upload.single('document'), isAuth, postReferent);
// Send request to update a date of referent by id
router.put("/:idVigTec/update-referent/:idReferent", isAuth, updateReferent);
// Send request to update a date of referent by id
router.delete("/:idVigTec/delete-referent/:idReferent", isAuth, deleteReferent);
// request post add colab to vig tec
router.post("/:idVigTec/colab/:idUser", isAuth, postAddColab);

module.exports = router;
