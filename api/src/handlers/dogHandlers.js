const validationParamt = require('../utils/validation');
const { searchAllDogs, searchByName, getDogId, createDogController, dogTempSelect } = require('../controllers/dogControllers')

const getDogAll = async (req,res)=> {
  const { name } = req.query;
  try {
    if(name){
      const dogByName = await searchByName(name);
      res.status(200).json(dogByName);
    }
    else{
      const getDog = await searchAllDogs();
      res.status(200).json(getDog);
    } 
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const dogById = async (req, res)=> {
  const { id } = req.params;

  try {
  const dogId = await getDogId(id);
  return res.status(200).json(dogId);
      
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const postDog = async (req, res)=> {
  try {
    const {
      image,
      name,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minLifeSpan,
      maxLifeSpan,
      Temperaments
    } = req.body;

    const info = { image, name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, Temperaments };
    validationParamt(info);

    const createDog = await createDogController({image, name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, Temperaments});
    res.status(201).json(createDog);

  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

const putDog = async (req, res)=> {
  try {
    const { Temperaments } = req.body;
    const dogPut = await dogTempSelect(Temperaments);
    res.status(200).json(dogPut);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getDogAll,
  dogById,
  postDog,
  putDog
}