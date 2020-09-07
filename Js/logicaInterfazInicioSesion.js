document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);

function iniciarSesion() {
  var sUsuario = "";
  var sPassword = "";
  var bAcceso = false;

  sUsuario = document.querySelector("#txtUsuario").Value;
  sPassword = document.querySelector("#txtPassword").Value;

  bAcceso = validarCredenciales(sUsuario, sPassword);
  console.log(bAcceso);
}
