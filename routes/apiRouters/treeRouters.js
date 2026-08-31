const express = require("express");
const isAuth = require("../../middleware/auth");
const router = express.Router();

const {
    postTree,
    getViewTree,
    getTree,
    postObj
} = require("../../controllers/apiControllers/treeController.js");

// Post problema estadao del arte vigilancia tec
router.post("/register/:idVigTec/", isAuth, postTree);

// DASHBOARD TREE PROBLEMS
router.get("/:idVigTec/:posTree", isAuth, getViewTree);

// DATA TREE PROBLEMS
router.get("/data/:idVigTec/:posTree", isAuth, getTree);

// Post objetivos estadao del arte vigilancia tec
router.post("/objetivos/:idVigTec/:idTree", isAuth, postObj);


module.exports = router;