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

const slideraccion = document.getElementById("slider-accion");
const slidercomedia = document.getElementById("slider-comedia");
const sliderterror = document.getElementById("slider-terror");
const slidersuspenso = document.getElementById("slider-suspenso");
const pelidestacada = document.getElementById("destaca_pelicula");

class MostrarPelicula {
  ver(peliculas) {
    let acumulador = 0;
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
        const itempeli = document.createElement("div");
        itempeli.className = "item";
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        slideraccion.appendChild(itempeli);
      }
      //En esta parte se busca si la pelicula es de "comedia" y esta publicada
      if (
        peliculas[i]._Categoria == "Comedia" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("div");
        itempeli.className = "item";
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        slidercomedia.appendChild(itempeli);
      }
      //En esta parte se busca si la pelicula es de "terror" y esta publicada
      if (
        peliculas[i]._Categoria == "Terror" &&
        peliculas[i]._Publicada === true
      ) {
        const itempeli = document.createElement("div");
        itempeli.className = "item";
        itempeli.innerHTML = `<img src="${peliculas[i]._Imagen}" />`;
        sliderterror.appendChild(itempeli);
      }
      //En esta parte se busca si la pelicula es de "suspenso" y esta publicada
      if (
        peliculas[i]._Categoria == "Suspenso" &&
        peliculas[i]._Publicada === true
      ) {
        //INTENTO: Este fue un intento de crear el slider completo de la catgoria
        //const titseccion = document.createElement("div");
        //titseccion.className = "tit-section";
        //titseccion.innerHTML = `<h5>Suspenso</h5>`;
        //const wrapper = document.createElement("div");
        //wrapper.className = "wrapper";
        //wrapper.innerHTML = `<section>
        //<a href="#cat1-sec3">‹</a>
        //<div id="slider-suspenso" class="d-flex flex-row"></div>
        //<a href="#cat1-sec2">›</a>
        //</section>
        //`;
        //zonasliders.appendChild(titseccion);
        //zonasliders.appendChild(wrapper);

        const itempeli = document.createElement("div");
        itempeli.className = "wrap";
        itempeli.innerHTML = `<div class="item"><img src="${peliculas[i]._Imagen}" /></div>`;
        slidersuspenso.appendChild(itempeli);
      }
    }
    if (acumulador === 0) {
      console.log("hola");
      const peli_d = document.createElement("div");
      peli_d.className = "destacado";
      peli_d.innerHTML = `
        
        `;
      pelidestacada.appendChild(peli_d);
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
