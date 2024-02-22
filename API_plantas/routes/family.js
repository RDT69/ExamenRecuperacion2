let { Router } = require('express');
const ROUTER = Router();

const PLANTS = require('../data/plant');

//Get all plants
ROUTER.get('/', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: GET de /family');
  const FAMILIES = [];
  PLANTS.forEach(p => {
    if (!FAMILIES.includes(p.family_name)) FAMILIES.push(p.family_name);
  });
  res.json(FAMILIES);
});


module.exports = ROUTER;