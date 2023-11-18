const options = {
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
    const respuesta = await fetch(url, options);
    const datos = await respuesta.json()
    return datos.genres;
  } catch(error) {
    console.log(error)
  }
}

export default fetchGeneros;