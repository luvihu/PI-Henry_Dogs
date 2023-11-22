const { Router } = require("express");
const { getDogAll, dogById, postDog }= require('../handlers/dogHandlers');
const validateCreate = require('../middleware/validateCreate');

const dogRoutes = Router();

dogRoutes.get('/', getDogAll);
dogRoutes.get('/:id', dogById);
dogRoutes.post('/', validateCreate, postDog);

module.exports = dogRoutes;