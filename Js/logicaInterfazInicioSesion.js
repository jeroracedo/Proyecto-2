/*document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);

function iniciarSesion() {
  var sUsuario = "";
  var sPassword = "";
  var bAcceso = false;

  sUsuario = document.querySelector("#txtUsuario").Value;
  sPassword = document.querySelector("#txtPassword").Value;

  bAcceso = validarCredenciales(sUsuario, sPassword);
  console.log(bAcceso);
}*/

document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);

function iniciarSesion() {
  var sUsuario = "";
  var sPassword = "";
  var bAcceso = false;

  sUsuario = document.querySelector("#txtUsuario").value;
  sPassword = document.querySelector("#txtPassword").value;

  bAcceso = validarCredenciales(sUsuario, sPassword);
  console.log(bAcceso);
  if (bAcceso == false) {
    alert("Usuario o contraseña incorrecto");
  }
}
