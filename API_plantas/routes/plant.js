let { Router } = require('express');
const ROUTER = Router();

const PLANTS = require('../data/plant');

//Get all plants
ROUTER.get('/', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: GET de /plant');
  res.json(PLANTS.map(p=>{
      return {
        id: p.id,
        name: p.name,
        family_name: p.family_name
      };
  }));
});

// Get a single plant
ROUTER.get('/:id', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: GET de /plant');
  let id = req.params.id;
  let plants = PLANTS.filter(plant => plant.id == id)
  if (plants.length>0) res.json(plants[0]);
  else res.status(404).json({"error": "Planta no encontrada"});
});

// Add a plant to the array
ROUTER.post('/', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: POST de /plant');
  let plant = req.body;
  console.log('Se recibe en el cuerpo de la petición: ', plant);
  if (plant.name && plant.scientific_name) {
    plant.id = Math.max(...PLANTS.map(a=>a.id))+1;
    if (!plant.family_name) {
      plant.family_name = "Unknown";
    }
    PLANTS.push(plant);
    res.status(200).json(plant);
  } else {
    console.log('ERROR: en los parámetros. Faltan o son erroneos "name" o "scientific_name"');
    res.status(400).json({"error": "en los parámetros. Faltan o son erroneos 'name' o 'scientific_name'"});
  }  
});

ROUTER.put('/:id', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: PUT de /plant');
  let id = req.params.id;
  let plant = req.body;
  console.log('Se quiere modificar la planta con el id='+id);
  console.log('Se recibe en el cuerpo de la petición: ', plant);
  if (id && plant.name && plant.scientific_name) {
    plant_old = PLANTS.filter(p => p.id == id);
    if (plant_old.length>0) {
      Object.keys(plant).forEach(key => plant_old[0][key]=plant[key]);
      res.status(200).json(plant_old[0]);
    } else {
      console.log('ERROR: planta con id= '+id+' no encontrado');
      res.status(404).json({"error": "planta con id= "+id+" no encontrado"});      
    }
  } else {
    console.log('ERROR: en los parámetros. Faltan o son erroneos "id", "name" o "scientific_name"');
    res.status(400).json({"error": "en los parámetros. Faltan o son erroneos id, name o scientific_name"});
  }  
});

ROUTER.delete('/:id', (req,res)=>{
  console.log('--------------------------------');
  console.log('Ejecutando método: DELETE de /plant');
  let id = req.params.id;
  console.log('Tratando de eliminar la planta con el id='+id);
  let index = PLANTS.map(c=>c.id).indexOf(parseInt(id));
  if (index>=0) {
    console.log("Se elimina la planta.");
    res.status(200).json(
          PLANTS.splice(index,1)[0]
      );
  } else {
      console.log("No se encuentra dicha planta.");
      res.status(404).json({
          error: "no se encuentra la planta con el id="+id
      });
  }
});

module.exports = ROUTER;