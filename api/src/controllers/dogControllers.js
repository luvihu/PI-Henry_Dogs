
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');

const searchAllDogs = async ()=> {
 const infoDog = (await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)).data;
  const mapDogs = infoDog.map((dog)=> ({
  id: dog.id,
  image: dog.image.url,
  name: dog.name,
  height: dog.height.metric,
  weight: dog.weight.metric? dog.weight.metric: 'Sin peso proporcionado',
  life_span: dog.life_span,
  Temperaments: dog.temperament? dog.temperament: 'Sin temperamento',
  created: false
  }));
 let dogDb = await Dog.findAll({
   include: {
     model: Temperament,
     attributes: ['name'],
     through: { attributes: [] },
   },
  });
 const infoTot = [...mapDogs, ...dogDb];
  return infoTot;
};
 const searchByName = async (name)=> {
  const searchDog = await searchAllDogs();
  const dogName = searchDog.filter((dg)=> {
  const filtBd = dg.name.toLowerCase();
  const filtIng = name.toLowerCase();
  return filtBd===filtIng || filtBd.includes(filtIng);
  });
  if(!dogName.length) throw new Error(`La raza ${name} no existe`);
  return dogName;
};

const getDogId = async (id)=> {
  const petById = await searchAllDogs();
  const arrayPet = petById.filter((p)=> p.id === id || p.id ===Number(id));
  if(!arrayPet.length) throw new Error(`No hay Dog con ID: ${id}`);
  return arrayPet;
};

const createDogController = async (info)=> {
  const { image, name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, Temperaments} = info;
  let nombre = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const newDog = await Dog.create({
    image:image,
    name: nombre,
    height: `${minHeight} - ${maxHeight}`,
    weight: `${minWeight} - ${maxWeight}`,
    life_span: `${minLifeSpan} - ${maxLifeSpan}`,
  });
     
  for (const temp of Temperaments) {
  let searchTemp = await Temperament.findAll({ where: { name: temp } });
      await newDog.addTemperaments(searchTemp);       
  };
      await newDog.reload({
        include: {
          model: Temperament,
          attributes: ['name'],
          through: { attributes: [] }
          }
      });
  return newDog;
};

const dogTempSelect = async (Temperaments)=> {
  const dogModif = await searchAllDogs();
  const filterDg = dogModif.filter((d)=> {
    d.Temperaments.some((temp)=> Temperaments.includes(temp))
  })
  return filterDg;

}

  module.exports= {
    searchByName,
    searchAllDogs,
    getDogId,
    createDogController,
    dogTempSelect
  };

  
  
  