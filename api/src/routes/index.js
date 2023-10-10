const { Router } = require("express");
const dogRoutes = require('./routerDogs');
const tempRoutes = require('./routerTemp');

const router = Router();

router.use("/dogs", dogRoutes);
router.use("/temperaments", tempRoutes);

module.exports = router;