const express = require("express");
const router = express.Router();
const AlegraController = require("../../controller/Alegra.controller");

router.get("/", AlegraController.executeAlegraFlow.bind(AlegraController));

module.exports = router;
