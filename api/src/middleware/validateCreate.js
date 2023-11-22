
const { searchAllDogs } = require('../controllers/dogControllers');

const validateCreate = async (req, res, next)=>{
  const { name } = req.body;

  let validCret = await searchAllDogs();

  const searchArray = validCret.some((el)=> el.name.toLowerCase() === name); 
  if(searchArray) return res.status(302).send('Dog ya existe');
  
  next();
};
  
module.exports = validateCreate;
