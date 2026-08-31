const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const {
  getAllUser, getUserByIdInfo, putUpdateUserByIdInfo, postForgotPassword,
  putChangePassword, deleteUserByIdInfo, findUser, postInviteUser
} = require("../controllers/userControllers");

router.get("/:user_id", getUserByIdInfo);

router.put("/:user_id", putUpdateUserByIdInfo);

router.post("/forgot-password", postForgotPassword);

router.put("/update/password", putChangePassword);

router.delete("/:user_id", deleteUserByIdInfo);

router.get("/all/users", isAuth, getAllUser);

router.get("/search/:user_data", findUser);

router.post("/invite", postInviteUser);


module.exports = router;