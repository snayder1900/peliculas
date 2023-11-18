'use strict';

const options$3 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWRjZjk0MjM4NjM4NTk4ZTVmZmQyOTI2M2I1ZDBiYyIsInN1YiI6IjY1M2Q1NmEwMTA5Y2QwMDBjOTQ3ZjUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jc5pjZC7m43gZ02BcPpZZ5-9WM2K8ZLDv0zq_XBVsLg'
  }
};



const fetchGeneros = async (filtro = 'movie') => {
  
  const tipo = filtro === 'movie' ? 'movie' : 'tv';

  const url = `https://api.themoviedb.org/3/genre/${tipo}/list?language=es-MX`;

  try {
    const respuesta = await fetch(url, options$3);
    const datos = await respuesta.json();
    return datos.genres;
  } catch(error) {
    console.log(error);
  }
};

const obtenerGenero = (id, generos) => {
  let nombreGenero;

  generos.forEach((elemento) => {
    if (id === elemento.id) {
      nombreGenero = elemento.name;
    }
  });

  return nombreGenero;
};

const options$2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWRjZjk0MjM4NjM4NTk4ZTVmZmQyOTI2M2I1ZDBiYyIsInN1YiI6IjY1M2Q1NmEwMTA5Y2QwMDBjOTQ3ZjUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jc5pjZC7m43gZ02BcPpZZ5-9WM2K8ZLDv0zq_XBVsLg'
  }
};

const fetchPopulares = async (filtro = 'movie') => {

  const tipo = filtro === 'movie' ? 'movie' : 'tv';

  
  try {
    const url = `https://api.themoviedb.org/3/${tipo}/popular?language=es-MX&page=1&region=US`;
    
    const respuesta = await fetch(url, options$2);
    const datos = await respuesta.json();
    const resultadosPopulares = datos.results;
    
    const generos = await fetchGeneros();
    resultadosPopulares.forEach((resultados) => {
      resultados.genero = obtenerGenero(resultados.genre_ids[0], generos);
    });

    return resultadosPopulares;
  } catch(error) {
    console.log(error);
  }

};

const cargarTitulos = (resultados) => {
  
  const contenedor = document.querySelector('#populares .main__grid');
  
  contenedor.innerHTML = '';

  resultados.forEach((resultado) => {
    
    const plantilla = `
      <div class="main__media" data-id="${resultado.id}">
        <a href="#" class="main__media-thumb">
          <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}" alt="" />
        </a>
        <p class="main__media-titulo">${resultado.title || resultado.name}</p>
        <p class="main__media-genero">${resultado.genero}</p>
      </div>
    `;

    contenedor.insertAdjacentHTML('beforeend', plantilla);
  });
};

const contenedorGeneros = document.getElementById('filtro-generos');


const cargarGeneros = async (filtro) => {

  const generosSidebar = await fetchGeneros(filtro);

  contenedorGeneros.innerHTML = '';
  
  generosSidebar.forEach((generos) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = generos.name;
    btn.setAttribute('data-id', generos.id);

    contenedorGeneros.appendChild(btn);
  });
};

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
});

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
});

const contenedor$1 = document.getElementById('filtro-generos');
contenedor$1.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button')) {

    contenedor$1.querySelector('.btn--active')?.classList.remove('btn--active');

    //Agregamos  la clase activa del boton que clickamos
    e.target.classList.add('btn--active');
  }
});

const options$1 = {
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
    const respuesta = await fetch(url, options$1);
    const datos = await respuesta.json();
    const resultadosPopulares = datos.results;

    const generos = await fetchGeneros();
    resultadosPopulares.forEach((resultados) => {
      resultados.genero = obtenerGenero(resultados.genre_ids[0], generos);
    });
    
    return resultadosPopulares;
  } catch (e) {
    console.log(e);
  }
};

const btn = document.getElementById('btn-buscar');

btn.addEventListener('click', async (e) => {
  const resultados = await fetchBusqueda();

  cargarTitulos(resultados);
});

const anterior = document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');

siguiente.addEventListener('click', async(e) => {
  const paginaActual = document.getElementById('populares').dataset.pagina;
  
  try {
    const resultados = await fetchBusqueda(paginaActual + 1);
    document.getElementById('populares').setAttribute('data-pagina', Number(paginaActual) + 1);
    cargarTitulos(resultados);
    window.scrollTo(0, 0);
  } catch (e) {
    console.log(e);
  }
});

anterior.addEventListener('click', async(e) => {
  const paginaActual = document.getElementById('populares').dataset.pagina;
  
  if (paginaActual > 1) {
    try {
      const resultados = await fetchBusqueda(paginaActual - 1);
      document.getElementById('populares').setAttribute('data-pagina', Number(paginaActual) - 1);
      cargarTitulos(resultados);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  }
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWRjZjk0MjM4NjM4NTk4ZTVmZmQyOTI2M2I1ZDBiYyIsInN1YiI6IjY1M2Q1NmEwMTA5Y2QwMDBjOTQ3ZjUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jc5pjZC7m43gZ02BcPpZZ5-9WM2K8ZLDv0zq_XBVsLg'
  }
};


const fetchItem = async(id) => {
  const tipo = document.querySelector(".main__filtros .btn--active").id;
  
  try {
    const url = `https://api.themoviedb.org/3/${tipo}/${id}?language=es-MX`;

    const respuesta = await fetch(url, options);
    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.log(error);
  }
};

const contenedor = document.getElementById('populares');
const popup$1 = document.getElementById('media');

contenedor.addEventListener('click', async(e) => {
  if (e.target.closest('.main__media')) {
    // Activamos el popup
    popup$1.classList.add('media--active');

    const id = e.target.closest('.main__media').dataset.id;
    
    const resultado = await fetchItem(id);

    const plantilla = `
      <div class="media__backdrop">
        <img
          src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
          class="media__backdrop-image"
        />
      </div>
      <div class="media__imagen">
        <img
          src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
          class="media__poster"
        />
      </div>
      <div class="media__info">
        <h1 class="media__titulo">${resultado.title || resultado.name}</h1>
        <p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
        <p class="media__overview">${resultado.overview}</p>
      </div>
      <button class="media__btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          class="media__btn-icono"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
          />
        </svg>
      </button>   
    `;

    document.querySelector('#media .media__contenedor').innerHTML = plantilla;
  }
});

const popup = document.getElementById('media');

popup.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    popup.classList.remove('media--active');
  }
});

const cargar = async () => {
  const resultados = await fetchPopulares();
  cargarTitulos(resultados);
  cargarGeneros('movie');
};

cargar();
//# sourceMappingURL=bundle.js.map
