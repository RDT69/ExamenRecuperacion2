<template>
<h1>Examen recuperacion Vue3</h1>
<Nombre/>
<h2>Crear Planta</h2>
<fieldset>
<form>
  <p>
  <label>Nombre</label>
  <input type="text" v-model="nombrePlanta"> <br>
  </p>Selecciona una familia:
    <select>
      <option v-for="fam in familia" :key="fam">{{fam}}</option>
    </select>
  <p>
  <label>Nombre Cientifico</label>
  <input type="text" v-model="cientifico"><br>
  </p>

  <button @click="createPlant()">Crear</button>
</form>
</fieldset>

<p>Filtrar planta:
  <input type="text" v-model="buscarPlanta">
</p>

<h3>Listado de plantas</h3>
<table> 
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Nombre-Cientifico</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="planta in filtrarPlanta" :key="planta">
      <td>{{planta.id}}</td>
      <td>{{planta.name}}</td>
      <td>{{planta.family_name}}</td>
      <td>
        <button @click="$emit('showPlanta', planta.id)">Mostrar</button>
        <button @click="deletePlant(planta.id)">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>

</template>

<script setup>
import { ref, computed } from 'vue';
import Nombre from './components/Nombre.vue'
import Mostar from './components/Mostar.vue';

const nombrePlanta = ref();
const familia = ref();
const cientifico = ref();
const buscarPlanta = ref('');

const filtrarPlanta = computed(() => {
  return plantas.value.filter((planta) => {
    return planta.name.toLowerCase().includes(buscarPlanta.value.toLowerCase());
  });
});

// const eliminar = document.getElementById('Eliminar')
const plantas = ref([]);
async function mostrarPlantas(){
  try {
    const res = await fetch("http://localhost:3000/api/plant");
    plantas.value = await res.json();
  } catch (error) {
    console.log(error + ' Error al cargar los datos de las plantas.');
  }
}

async function deletePlant(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/plant/${id}`, {method: 'DELETE'}); {
      if (res.ok) {
        console.log('Planta eliminada');
        mostrarPlantas();
      }
    }
  } catch (error){
    console.log(error + ' Error al eliminar las plantas.');
  }
}

async function createPlant() {
  let planta = {
    "nombre" : nombrePlanta.value,
    "nombre_familia": familia.value,
    "nombre_cientifico": cientifico.value
  };
  try {
    const res = await fetch('http://localhost:3000/api/plant',{
        method: 'POST',
        body: JSON.stringify (planta)
    });
    if (res.ok) {
      console.log('Planta creada');
      mostrarPlantas();
    }
  } catch (error){
    console.log(error + ' Error al crear las plantas.');
  }
}

async function mostrarFamilia(){
  try {
    const res = await fetch("http://localhost:3000/api/family");
    familia.value = await res.json();
  } catch (error) {
    console.log(error + ' Error al cargar los datos de las familias de las plantas.');
  }
}

mostrarPlantas();
mostrarFamilia();
</script>
<style scoped>
  
</style>