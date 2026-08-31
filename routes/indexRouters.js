const express = require("express");
const isAuth = require("../middleware/auth");
const { getHomePage, getDashboard, getDashboardProblematica, getProfileUser, getUsers, getFichas, testSim } = require("../controllers/indexControllers");
const router = express.Router();

// HOME PAGE
router.get("/", getHomePage);

// DASHBOARD VIGILANCIA TECNOLOGIOCA
router.get("/dashboard-vig-tec", isAuth, getDashboard);

// DASHBOARD PROBLEMATICA
router.get("/dashboard-problematicas", isAuth, getDashboardProblematica);

// ADMIN USERS
router.get("/users", isAuth, getUsers);

// ADMIN FICHAS vigilancia
router.get("/vigilancias", isAuth, getFichas);

// PROFILE
router.get("/profile", isAuth, getProfileUser);

// PROFILE
router.post("/testSim", testSim);

module.exports = router;
