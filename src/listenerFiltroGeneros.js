
const contenedor = document.getElementById('filtro-generos');
contenedor.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button')) {

    contenedor.querySelector('.btn--active')?.classList.remove('btn--active');

    //Agregamos  la clase activa del boton que clickamos
    e.target.classList.add('btn--active');
  }
})