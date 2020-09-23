/*Funcion para cambiar el color de la barra de navegacion cuando hace scroll*/
$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});
//funciones para el contenido del slider
const pelis = JSON.parse(localStorage.getItem("peliculas"));
class MostrarPelicula {
  ver(peliculas) {
    const slider = document.getElementById("slider");

    for (var i = 0; i < peliculas.length; i++) {
      console.log(peliculas[i]);
      const itempeli = document.createElement("div");
      itempeli.className = "item";
      itempeli.innerHTML = `
            <img src="${peliculas[i]._Imagen}" />
      `;

      slider.appendChild(itempeli);
    }
  }
}
function iniciocarousel() {
  if (localStorage.getItem("peliculas")) {
    const pelis = JSON.parse(localStorage.getItem("peliculas"));
    const ini = new MostrarPelicula();
    console.log("ufa..");
    ini.ver(pelis);
  }
}

iniciocarousel();
