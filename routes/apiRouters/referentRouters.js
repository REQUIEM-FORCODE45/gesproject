const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    postReferent,
    updateReferent,
    deleteReferent,
    getRefetent,
    deleteFile,
    updateAllReferent
} = require("../../controllers/apiControllers/referentController");

const multer  = require('multer')
const storage = require('../../utils/file')
let storageFile = storage.fileStorage
const upload = multer({ storage: storageFile })

// request referent of Vig Tec by ID
router.get("/:idVigTec/ref/:idReferent", isAuth, getRefetent);
// request referent of Vig Tec by ID
router.put("/:idVigTec/ref/:idReferent/delete/file", isAuth, deleteFile);
// request referent of Vig Tec by ID
router.put("/:idVigTec/ref/:idReferent/update", upload.single('document'), isAuth, updateAllReferent);


module.exports = router;