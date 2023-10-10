const { getAllTemp } = require('../controllers/tempController');

const getTemperaments = async (req,res)=> {
try {
  const dataTemp = await getAllTemp();
  res.status(200).json(dataTemp);
  
} catch (error) {
  res.status(500).json({ error: error.message });
}  

};

module.exports = {
  getTemperaments
};