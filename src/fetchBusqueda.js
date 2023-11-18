import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWRjZjk0MjM4NjM4NTk4ZTVmZmQyOTI2M2I1ZDBiYyIsInN1YiI6IjY1M2Q1NmEwMTA5Y2QwMDBjOTQ3ZjUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jc5pjZC7m43gZ02BcPpZZ5-9WM2K8ZLDv0zq_XBVsLg'
  }
};


const fetchBusqueda = async(pagina = 1) => {
  
  const tipo = document.querySelector('.main__filtros .btn--active').id;
  const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id;
  const añoInicial = document.getElementById('años-min').value || 1950;
  const añoFinal = document.getElementById('años-max').value || 2023;
  
  let url;
  if (tipo === 'movie') {
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-MX&region=US&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&sort_by=popularity.desc&with_genres=${idGenero}&with_watch_monetization_types=faltrate`;
  } else if (tipo === 'tv') {
    url = `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${añoInicial}&first_air_date.lte=${añoFinal}&include_adult=false&include_null_first_air_dates=false&language=es-MX&page=${pagina}&sort_by=popularity.desc&with_genres=${idGenero}`;
  }

  try {
    const respuesta = await fetch(url, options);
    const datos = await respuesta.json();
    const resultadosPopulares = datos.results;

    const generos = await fetchGeneros();
    resultadosPopulares.forEach((resultados) => {
      resultados.genero = obtenerGenero(resultados.genre_ids[0], generos);
    })
    
    return resultadosPopulares;
  } catch (e) {
    console.log(e)
  }
}

export default fetchBusqueda;