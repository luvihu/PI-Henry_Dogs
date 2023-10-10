
const axios = require('axios');
// const apiKey = decodeURIComponent(process.env.API_KEY);
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
  const arrayPet = petById.filter((p)=> {
    return p.id == id;
  });
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

  //   const tempD = await Temperament.findAll({
  //     where: { id: temperamentId }
  // });
  // await newDog.addTemperaments(tempD);
  // await newDog.reload({
  //     include: {
  //         model: Temperament,
  //         attributes: ['name'],
  //         through: { attributes: [] }
  //     }
  // });

  //   await newDog.addTemperaments(temperament);

  // let searchDog = await Dog.findByPk(newDog.id);
  // let dogTemp = await searchDog.getTemperaments();
  // let tempName = dogTemp.map(
  //   (t) => t.name
  // );

  // return { ...searchDog.toJSON(), temperament: tempName };

    // if (temperament && temperament.length > 0) {
    //   for (const temp of temperament) {
    //     await newDog.addTemperament(temp);
    //   }
    // };
    // return newDog;
   

    //   let temps = temperament.split(", ");
    //     for (const temp of temps) {
    //       await newDog.addTemperament(
    //         await Temperament.findOne({ where: { name: temp } })
    //       );
    //     }
    
       
    // await Dog.findAll({
    //    where: {
    //      name,
    //    },
    //    include: {
    //      model: Temperament,
    //      as: "temperament",
    //      attributes: ["name"],
    //      through: { attributes: [] },
    //    },
    //  });
   
   
  
  // const nwTemp = await Temperament.findAll({
  //   where: { name: temperament}
  // });

  // await newDog.addTemperament(nwTemp);
  // const mpTemp = nwTemp.map((t)=> t.name);
  // for(let temp of temperament){
  //   if(!mpTemp.includes(temp)){
  //     await Temperament.create({ name: temp});
  //   }
  // };
  
  // const findTemp = await Temperament.findOne({
  //   where:{ name: temp }
  // });

  // await newDog.addTemperament(findTemp)
  


// Temperaments: temperament --> en el modelo create Sequeliza tiene la opcion include, 
//que permite relacionar los temperamentos durante la creación, este código
// se coloca dentro de la creación, y retornar de frente asi:
 // return {
  //   ...newDog.toJSON(),
  //   temperament: temperament.map((t) => t.name),
  // };

  //sin colocar ningun ccodigo adicional

  //-------------------------------------------------------------------


  // esta relación es con el temperamentId ///

  //  if(temperamentId){
    
  //    const tpDogs = await Temperament.findAll({
  //     where: { id: temperamentId }
  // });
  //  if(tpDogs.length>0) {

  //    await newDog.setTemperaments(tpDogs);
  //  }
  //  };

  //   await newDog.reload({
  //       include: {
  //           model: Temperament,
  //           attributes: ['name'],
  //           through: { attributes: [] }
  //       }
  //   });
  //   return newDog;
  //--------------------------------------------------------

  // if (typeof temperament === "string") {
  //   await newDog.addTemperaments(temperament);
  // }
