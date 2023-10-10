const { Router } = require("express");
const { getTemperaments } = require('../handlers/tempHandler');

const tempRoutes = Router();

tempRoutes.get('/', getTemperaments);

module.exports= tempRoutes;