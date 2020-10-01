//Funcion para cambiar el color de la barra de navegacion cuando hace scroll
$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});
//Funciones para el contenido dinámico
// Trae el listado de peliculas del Local Storage
const pelis = JSON.parse(localStorage.getItem("peliculas"));
//const zonasliders = document.getElementById("zona-sliders");
const slideraccion = document.getElementById("slider-accion");
const slidercomedia = document.getElementById("slider-comedia");
const sliderterror = document.getElementById("slider-terror");
const slidersuspenso = document.getElementById("slider-suspenso");
const pelidestacada = document.getElementById("destaca_pelicula");

class MostrarPelicula {
  ver(peliculas) {
    let acumulador = 0;
    let acumuladorAccion = 0;
    let acumuladorComedia = 0;
    let acumuladorTerror = 0;
    let acumuladorSuspenso = 0;
    function ocultarElementos(idTitulo, idWrapper) {
      const ocultarTitulo = document.getElementById(idTitulo);
      const ocultarWrapper = document.getElementById(idWrapper);
      ocultarTitulo.style.display = "none";
      ocultarWrapper.style.display = "none";
    }
    function listadoImagenes() {}

    for (var i = 0; i < peliculas.length; i++) {
      //En esta parte se busca si la pelicula esta destacada y publicada
      if (
        peliculas[i]._Destacada === true &&
        peliculas[i]._Publicada === true
      ) {
        //y crea un div con clase "destacado" e inserta el html de la pelicula destacada
        const peli_d = document.createElement("div");
        peli_d.className = "destacado";
        peli_d.innerHTML = `
        <img src="${peliculas[i]._Imagen}" />
        <div class="resumen-peli">
          <h3 class="display-4">${peliculas[i]._Nombre}</h3>
          <p>
          ${peliculas[i]._Descripcion}
          </p>
          <button id="btnPlay" data-target="#player" data-toggle="modal">
            <i class="fa fa-play-circle" aria-hidden="true"></i> Reproducir
          </button>`;
        pelidestacada.appendChild(peli_d);
        acumulador++;
      }
      //En esta parte se busca si la pelicula es de "accion" y esta publicada
      if (
        peliculas[i]._Categoria == "Acción" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("li");
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        slideraccion.appendChild(itempeli);
        acumuladorAccion++;
      }
      //En esta parte se busca si la pelicula es de "comedia" y esta publicada
      if (
        peliculas[i]._Categoria == "Comedia" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("li");
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        slidercomedia.appendChild(itempeli);
        acumuladorComedia++;
      }
      //En esta parte se busca si la pelicula es de "terror" y esta publicada
      if (
        peliculas[i]._Categoria == "Terror" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("li");
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        sliderterror.appendChild(itempeli);
        acumuladorTerror++;
      }
      //En esta parte se busca si la pelicula es de "suspenso" y esta publicada
      if (
        peliculas[i]._Categoria == "Suspenso" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("li");
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        slidersuspenso.appendChild(itempeli);
        acumuladorSuspenso++;
      }
    }
    if (acumulador === 0) {
      console.log("hola");
      const peli_d = document.createElement("div");
      peli_d.className = "destacado";
      peli_d.innerHTML = `
      <img src="https://muzzo.com.ar/v/videodemanda.jpg"/>
      <div class="texto-inicio d-flex flex-column align-items-start">
        <h1>NetFilms</h1>
        <h3><i>las mejores películas y series</i></h3>
      </div>`;
      pelidestacada.appendChild(peli_d);
    }
    //Si no hay películas de alguna categoria, oculta el titulo del slider
    if (acumuladorAccion === 0) {
      ocultarElementos("tAcc", "wAcc");
    }
    if (acumuladorComedia === 0) {
      ocultarElementos("tCom", "wCom");
    }
    if (acumuladorTerror === 0) {
      ocultarElementos("tTer", "wTer");
    }
    if (acumuladorSuspenso === 0) {
      ocultarElementos("tSus", "wSus");
    }
  }
}
//Funcion para iniciar la seccion de los sliders de categorias de peliculas
function iniciocarousel() {
  if (localStorage.getItem("peliculas")) {
    const pelis = JSON.parse(localStorage.getItem("peliculas"));
    const ini = new MostrarPelicula();
    ini.ver(pelis);
  }
}

iniciocarousel();
