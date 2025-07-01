const express = require("express");
const bebidaRouter = express.Router();

// Declaramos un objeto nuevo
let Bebida = require("../models/Bebida");

// Exportamos el router
module.exports = bebidaRouter;
