/*Funcion para cambiar el color de la barra de navegacion cuando hace scroll*/
$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});
/*funcion para unificar el tamaño de las imagenes de las peliculas*/
pelisImgId = document.getElementById("pelisImgId");
pelisImgId.style.height = "50px";
pelisImgId.style.width = "50px";
