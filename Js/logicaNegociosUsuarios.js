/*Roles:
    1:admin
    2:cliente
*/

function obtenerlistadeusuarios() {
  var listaUsuarios = json.parse(localStorage.getItem("listaUsuariosLs"));

  if (listaUsuarios == null) {
    listaUsuarios = [
      //id, usuario, contraseña, rol
      ["1", "admin", "admin", "1"],
      ["2", "cliente", "cliente", "2"],
    ];
  }
  return listaUsuarios;
}

function validarCredenciales(pUsuario, pPassword) {
  var listaUsuarios = obtenerlistadeusuarios();
  var bAcceso = false;

  for (var i = 0; i < listaUsuarios.lenght; i++) {
    if (pUsuario == listaUsuarios[i][1] && pPassword == listaUsuarios[i][2]) {
      bAcceso = true;
      sessionStorage.setItem(
        "usuarioActivo",
        listaUsuarios[i][1] + " " + listaUsuarios[i][2]
      );
      sessionStorage.setItem("rolUsuarioActivo", listaUsuarios[i][3]);
    }
  }
  return false;
}
