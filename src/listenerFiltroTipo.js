import cargarGeneros from "./cargarGeneros";
import cargarTitulos from "./cargarTitulos";
import fetchPopulares from "./fetchPopulares";

const filtroPelicula = document.getElementById('movie');
const filtroSerie = document.getElementById('tv');

filtroPelicula.addEventListener('click', async (e) => {
  e.preventDefault();
  
  cargarGeneros('movie');

  const resultados = await fetchPopulares('movie');

  cargarTitulos(resultados);

  filtroSerie.classList.remove('btn--active');
  filtroPelicula.classList.add('btn--active');
  document.querySelector('#populares .main__titulo').innerText = 'Peliculas populares';
})

filtroSerie.addEventListener('click', async (e) => {
  e.preventDefault();
  
  //Cargamos los generos en la barra lateral
  cargarGeneros('tv');

  //Obtenemos los resultados
  const resultados = await fetchPopulares('tv');
  
  //las cargamos en el DOM
  cargarTitulos(resultados);

  filtroPelicula.classList.remove('btn--active');
  filtroSerie.classList.add('btn--active');

  document.querySelector('#populares .main__titulo').innerText = 'Series Populares';
})

