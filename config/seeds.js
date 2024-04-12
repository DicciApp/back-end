import fetch from "node-fetch";
import { WordModel } from "../models"; 

async function fetchDataAndSaveToDB() {
  try {
    const url = 'https://diccionariosv5.p.rapidapi.com/entradas?diccionario=nahuatl%20%7C%7C%20dioses&cantidad=20';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8d64ef9a65mshef31e12542bd460p101867jsn05e5d4d68e78',
        'X-RapidAPI-Host': 'diccionariosv5.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const result = await response.json();
   
    for (const entry of result) {
    
      const newEntry = new WordModel({
        word: entry.word,
        origin: entry.definition
      });

      await newEntry.save();
    }

    console.log('Data saved in the database');
  } catch (error) {
    console.log('Error trying to save data', error);
  }
}

fetchDataAndSaveToDB();


// conctar registeer al front end 
// hacer lo mismo con el login 
// refrescar la pagina al final de la funcion despues que se cres en lpagina como se refresca la pagina 
// funcion para conectar la api 