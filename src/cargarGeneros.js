import fetchGeneros from "./fetchGeneros";

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
  })
}

export default cargarGeneros;