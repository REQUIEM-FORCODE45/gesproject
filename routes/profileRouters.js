const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { createProfileUserById, getUserProfileById, deleteUserByIdProfile, updateUserProfile, UpdateRolUser, UpdateStateUser} = require("../controllers/profileControllers");

// GET user profile by id
router.get("/:user_id", isAuth, getUserProfileById);

// POST route user by id add profile 
router.post("/:user_id/add", createProfileUserById);

// DELETE delete user profile by id
router.delete("/:user_id", isAuth, deleteUserByIdProfile);

// PUT route user by id update profile 
router.put("/update", updateUserProfile);

router.put("/:user_id/rol", UpdateRolUser);

router.put("/:user_id/state", UpdateStateUser);

module.exports = router;
