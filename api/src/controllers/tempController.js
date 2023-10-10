const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db');

const getAllTemp = async ()=> {
  const tempDb = await Temperament.findAll();
  if(!tempDb.length){
    const dataTemp = (await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)).data;

    let temp = [];
  
    dataTemp.map((tm)=> {
      if(tm.temperament) {
        const pushTemp = tm.temperament.split(',');
       return temp.push(pushTemp);
      }
    })

    let filterTemp = temp.flat().sort(); 
    
    let tempCopy =Array.from(new Set(filterTemp));
    tempCopy.pop();
    
    await Promise.all(
      tempCopy.map((t)=>{
        Temperament.findOrCreate({
          where: {
            name: t.trim(),
          },
        })
      })
    );
   
    return tempCopy;
  }
  return tempDb.map((t)=> t.name);
  
};

module.exports = {
  getAllTemp
};
